/**
 * @description Base64 编码解码工具类，专门处理 UTF-8 字符集
 *
 * 解决了原生 `btoa` 函数不支持中文字符等非 ASCII 字符的问题。
 */
export class Base64Utils {
  /**
   * 将字符串编码为 Base64 格式
   *
   * @param str 待编码的原始字符串 (支持中文字符)
   * @returns Base64 编码后的字符串
   *
   * @example
   * const encoded = Base64Utils.encode('你好, world!');
   * console.log(encoded); // "5L2g5aW9LCB3b3JsZCE="
   */
  public static encode(str: string): string {
    // 1. 将字符串中的每个字符的16位码元编码为UTF-8序列
    const utf8Str = unescape(encodeURIComponent(str))
    // 2. 使用 btoa 进行Base64编码
    return btoa(utf8Str)
  }

  /**
   * 将 Base64 字符串解码为原始字符串
   *
   * @param base64Str 待解码的 Base64 字符串
   * @returns 解码后的原始字符串 (支持中文字符)
   *
   * @example
   * const decoded = Base64Utils.decode('5L2g5aW9LCB3b3JsZCE=');
   * console.log(decoded); // "你好, world!"
   */
  public static decode(base64Str: string): string | null {
    if (!base64Str) {
      return null
    }
    try {
      // 1. 使用 atob 进行Base64解码
      const binaryStr = atob(base64Str)
      // 2. 将解码后的二进制字符串重新编码为UTF-8，以还原原始字符
      return decodeURIComponent(escape(binaryStr))
    } catch (e) {
      console.error('Base64Utils.decode: 解码失败，输入字符串可能格式不正确。', {
        input: base64Str,
        error: e,
      })
      return null // 解码失败时返回 null，防止程序崩溃
    }
  }
}

// ================== 使用示例 ==================
export function runBase64Demo() {
  console.log('=============== Base64 工具类示例 ===============')
  const originalText = '你好,这是包含中文和 Emoji 的字符串!'
  console.log('原始文本:', originalText)

  const encoded = Base64Utils.encode(originalText)
  console.log('编码后:', encoded)

  const decoded = Base64Utils.decode(encoded)
  console.log('解码后:', decoded)

  console.log('编解码是否一致:', originalText === decoded)
}
