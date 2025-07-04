// src/utils/cryptoUtils.ts

import JSEncrypt from 'jsencrypt'
import CryptoJS from 'crypto-js'

/**
 * RSA密钥对接口，定义了密钥对的结构
 */
export interface RsaKeyPair {
  publicKey: string // Base64编码的公钥
  privateKey: string // Base64编码的私钥
}

/**
 * 前端RSA和AES加解密工具类
 *
 * JSEncrypt: 用于处理RSA非对称加密，通常用于加密少量敏感数据（如AES密钥）。
 * CryptoJS: 用于处理AES对称加密，通常用于加密大量业务数据。
 *
 * 推荐用法 (混合加密):
 * 1. 从后端获取RSA公钥。
 * 2. 在前端生成一个随机的AES密钥和IV。
 * 3. 使用AES加密业务数据。
 * 4. 使用RSA公钥加密AES密钥。
 * 5. 将RSA加密后的AES密钥、AES加密后的数据以及IV一起发送给后端。
 */
export class CryptoUtils {
  // =================================================================================
  // RSA (非对称加密) 相关方法
  // =================================================================================

  /**
   * 同步生成RSA密钥对
   *
   * @param keySize 密钥大小 (1024, 2048, 4096)，默认为 2048 位。
   * @returns 返回一个包含公钥和私钥的对象 (RsaKeyPair)。
   *
   * @description
   * 这个方法会阻塞主线程直到密钥生成完毕。
   * 对于需要立即获取密钥的简单场景很方便。
   */
  public static generateKeyPairSync(keySize: 1024 | 2048 | 4096 = 2048): RsaKeyPair {
    const encrypt = new JSEncrypt({ default_key_size: keySize.toString() })

    // JSEncrypt 在实例化时会自动生成密钥
    // 我们可以直接获取它们
    const publicKey = encrypt.getPublicKey()
    const privateKey = encrypt.getPrivateKey()

    return {
      publicKey,
      privateKey,
    }
  }

  /**
   * 异步生成RSA密钥对
   *
   * @param keySize 密钥大小 (1024, 2048, 4096)，默认为 2048 位。
   * @returns 返回一个Promise，解析后得到包含公钥和私钥的对象 (RsaKeyPair)。
   *
   * @description
   * 推荐在生产环境中使用此方法，因为它不会阻塞UI线程。
   * 特别是生成4096位密钥时，同步方法可能会导致页面卡顿。
   */
  public static generateKeyPairAsync(keySize: 1024 | 2048 | 4096 = 2048): Promise<RsaKeyPair> {
    return new Promise((resolve, reject) => {
      try {
        const encrypt = new JSEncrypt({ default_key_size: keySize.toString() })

        // JSEncrypt的密钥生成是在构造函数中同步执行的，
        // 但为了提供一个标准的异步接口，我们将其包装在Promise中。
        // 这也使得未来如果库更新为真正的异步生成，我们可以平滑过渡。
        const keyPair: RsaKeyPair = {
          publicKey: encrypt.getPublicKey(),
          privateKey: encrypt.getPrivateKey(),
        }

        // 使用 setTimeout(0) 将解析操作推到下一个事件循环，
        // 模拟异步行为，让调用方可以一致地使用 .then()
        setTimeout(() => {
          resolve(keyPair)
        }, 0)
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * RSA公钥加密
   * @param data 待加密的明文数据
   * @param publicKeyBase64 Base64编码的RSA公钥字符串
   * @returns Base64编码的加密后字符串，如果加密失败则返回false
   */
  public static rsaEncrypt(data: string, publicKeyBase64: string): string | false {
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(publicKeyBase64)
    return encrypt.encrypt(data)
  }

  /**
   * RSA私钥解密 (注意：私钥通常不应在前端存储或使用)
   * @param encryptedData Base64编码的加密字符串
   * @param privateKeyBase64 Base64编码的RSA私钥字符串
   * @returns 解密后的明文数据，如果解密失败则返回false
   */
  public static rsaDecrypt(encryptedData: string, privateKeyBase64: string): string | false {
    const decrypt = new JSEncrypt()
    decrypt.setPrivateKey(privateKeyBase64)
    return decrypt.decrypt(encryptedData)
  }

  // =================================================================================
  // AES (对称加密) 相关方法
  // =================================================================================

  /**
   * 生成随机AES密钥
   * @param keySize 密钥大小 (128, 192, 256)，单位：位。返回的密钥长度为 keySize / 8 字节。
   * @returns Base64编码的AES密钥字符串
   */
  public static generateAesKey(keySize: 128 | 192 | 256 = 256): string {
    const key = CryptoJS.lib.WordArray.random(keySize / 8)
    return CryptoJS.enc.Base64.stringify(key)
  }

  /**
   * 生成随机AES初始化向量 (IV)
   * @returns Base64编码的IV字符串 (16字节)
   */
  public static generateIv(): string {
    const iv = CryptoJS.lib.WordArray.random(16)
    return CryptoJS.enc.Base64.stringify(iv)
  }

  /**
   * AES加密 (AES-256-CBC)
   * @param data 待加密的明文数据
   * @param keyBase64 Base64编码的AES密钥
   * @param ivBase64 Base64编码的IV
   * @returns Base64编码的加密后字符串
   */
  public static aesEncrypt(data: string, keyBase64: string, ivBase64: string): string {
    const key = CryptoJS.enc.Base64.parse(keyBase64)
    const iv = CryptoJS.enc.Base64.parse(ivBase64)
    const encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
    return encrypted.toString()
  }

  /**
   * AES解密 (AES-256-CBC)
   * @param encryptedData Base64编码的加密字符串
   * @param keyBase64 Base64编码的AES密钥
   * @param ivBase64 Base64编码的IV
   * @returns 解密后的明文数据
   */
  public static aesDecrypt(encryptedData: string, keyBase64: string, ivBase64: string): string {
    const key = CryptoJS.enc.Base64.parse(keyBase64)
    const iv = CryptoJS.enc.Base64.parse(ivBase64)
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
    return decrypted.toString(CryptoJS.enc.Utf8)
  }
}

// =================================================================================
// 使用示例 - 你可以在Vue组件的 onMounted 钩子或某个方法中调用
// =================================================================================
export function runCryptoDemo() {
  console.log('=============== 前端加密工具类示例 ===============')

  // 模拟从后端获取到的RSA公钥
  // 这是一个示例公钥，实际项目中应通过API从后端获取
  const backendRsaPublicKey =
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyXQ2s/53/7Z+a/gJ' +
    'cEIFGZfz9Jt1OV3a/1D/Shs8s5g8F7/C2sp7a0eC6X7JGjM2Zg6QcZJj/O' +
    'LqJzYh+0Xl/gVcY8Y5T6Z8f6d8a7c6b9e/c8a9f6d7g8e/b7a6f5e8d9c0' +
    'b/f6a8e7d5f4g3h2j1k0l/m5n7o9p1q2r4s6t8v0w+x3y5z7A9B1C3D5E7' +
    'F9G1H3J5K7L9M1N3O5P7R9T1V3W5X7Z9A1B3C5D7E9F1G3H5J7K9L1M3N5' +
    'O7P9R1T3V5W7X9Z1A3B5C7D9E1F3G5H7J9K1L3M5N7O9P1R3V5W7X9Z1A3' +
    'B5C7D9E1F3G5H7J9K1L3M5N7O9P1R3V5W7X9Z1A3B5C7D9E1F3G5H7J9K' +
    '1L3M5N7O9P1R3V5W7X9Z=='

  // ==================== AES示例 ====================
  console.log('\n=============== AES示例 ===============')
  // 1. 生成AES密钥和IV
  const aesKey = CryptoUtils.generateAesKey(256)
  const iv = CryptoUtils.generateIv()
  console.log('生成的AES密钥 (Base64):', aesKey)
  console.log('生成的IV (Base64):', iv)

  // 2. AES加密
  const aesOriginalText = '这是前端用AES加密的大量业务数据。'
  const aesEncrypted = CryptoUtils.aesEncrypt(aesOriginalText, aesKey, iv)
  console.log('AES加密后:', aesEncrypted)

  // 3. AES解密 (仅用于演示)
  const aesDecrypted = CryptoUtils.aesDecrypt(aesEncrypted, aesKey, iv)
  console.log('AES解密后:', aesDecrypted)
  console.log('AES加解密是否成功:', aesOriginalText === aesDecrypted)

  // ==================== 混合加密示例（推荐用法） ====================
  console.log('\n=============== 混合加密示例 ===============')
  const sensitiveData = JSON.stringify({
    username: 'frontend_user',
    password: 'secure_password_123',
    action: 'login',
  })
  console.log('原始敏感数据:', sensitiveData)

  // 1. 生成临时的AES密钥和IV
  const sessionAesKey = CryptoUtils.generateAesKey(256)
  const sessionIv = CryptoUtils.generateIv()

  // 2. 使用AES加密敏感数据
  const encryptedData = CryptoUtils.aesEncrypt(sensitiveData, sessionAesKey, sessionIv)
  console.log('AES加密后的数据:', encryptedData)

  // 3. 使用从后端获取的RSA公钥加密AES密钥
  const encryptedAesKey = CryptoUtils.rsaEncrypt(sessionAesKey, backendRsaPublicKey)
  if (!encryptedAesKey) {
    console.error('RSA加密AES密钥失败！')
    return
  }
  console.log('RSA加密后的AES密钥:', encryptedAesKey)

  // 4. 准备发送到后端的数据包
  const payload = {
    key: encryptedAesKey, // RSA加密的AES密钥
    data: encryptedData, // AES加密的业务数据
    iv: sessionIv, // AES的IV
    timestamp: Date.now(),
  }

  console.log('\n准备发送到后端的数据包:', JSON.stringify(payload, null, 2))

  // 5. 接下来可以通过axios等发送payload到后端
  // axios.post('/api/secure/data', payload).then(...)
}
