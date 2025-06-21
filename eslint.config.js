//eslint.config.js

// 导入 ESLint 相关插件和解析器

import pluginJs from '@eslint/js' // ESLint JavaScript 规则插件

import tseslint from '@typescript-eslint/eslint-plugin' // TypeScript ESLint 插件

import tsParser from '@typescript-eslint/parser' // TypeScript 解析器

import pluginVue from 'eslint-plugin-vue' // Vue.js ESLint 插件

import vueEslintParser from 'vue-eslint-parser' // Vue 解析器
import globals from 'globals'

// 导出 ESLint 配置数组

export default [
  {
    // 适用于的文件类型

    files: ['**/*.{js,mjs,cjs,ts,vue}'],

    // 忽略的文件和文件夹

    ignores: ['node_modules', 'dist', '*.config.js'],

    languageOptions: {
      globals: globals.browser, // 使用浏览器全局变量
      environment: {
        node: true, // 👈 开启 Node.js 环境
      },

      ecmaVersion: 'latest', // 使用最新的 ECMAScript 版本

      sourceType: 'module', // 使用模块类型

      parser: tsParser, // 使用 TypeScript 解析器
    },

    // 配置使用的插件

    plugins: {
      vue: pluginVue, // 引入 Vue 插件

      '@typescript-eslint': tseslint, // 引入 TypeScript ESLint 插件
    },

    // 定义 ESLint 规则

    rules: {
      ...pluginJs.configs.recommended.rules, // JavaScript 推荐规则

      ...tseslint.configs.recommended.rules, // TypeScript 推荐规则

      ...pluginVue.configs['flat/essential'].rules, // Vue 推荐规则

      // JavaScript 规则

      'no-var': 'error', // 禁止使用 var

      'no-multiple-empty-lines': ['warn', { max: 1 }], // 允许最多一行空行

      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 在生产环境中禁止使用 console

      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 在生产环境中禁止使用 debugger

      'no-unexpected-multiline': 'error', // 禁止意外的多行

      'no-useless-escape': 'off', // 关闭不必要的转义

      // TypeScript 规则

      '@typescript-eslint/no-unused-vars': 'error', // 禁止未使用的变量

      '@typescript-eslint/prefer-ts-expect-error': 'error', // 优先使用 ts-expect-error

      '@typescript-eslint/no-explicit-any': 'off', // 允许使用 any 类型

      '@typescript-eslint/no-non-null-assertion': 'off', // 允许使用非空断言

      '@typescript-eslint/no-namespace': 'off', // 允许使用命名空间

      '@typescript-eslint/semi': 'off', // 关闭分号规则

      // Vue 规则

      'vue/multi-word-component-names': 'off', // 关闭组件名称必须是多词的规则

      // "vue/script-setup-uses-vars": "error", // 检查 script setup 中的变量

      'vue/no-mutating-props': 'off', // 允许在 props 中进行变更

      'vue/attribute-hyphenation': 'off', // 允许不使用连字符的属性命名
    },
  },

  {
    // 适用于 Vue 文件

    files: ['**/*.vue'],

    languageOptions: {
      parser: vueEslintParser, // 使用 Vue 解析器

      parserOptions: {
        parser: tsParser, // 使用 TypeScript 解析器

        ecmaVersion: 'latest', // 使用最新的 ECMAScript 版本

        sourceType: 'module', // 使用模块类型
      },
    },
  },
]
