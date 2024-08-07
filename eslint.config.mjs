import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier' // 新增

export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } }
  },
  eslintConfigPrettier,
  {
    rules: {
      'no-debugger': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' }
      ],
      // any warn
      '@typescript-eslint/no-explicit-any': 'warn'
      // 'vue/max-len': [
      //   'error',
      //   {
      //     code: 80,
      //     template: 80,
      //     tabWidth: 2,
      //     comments: 80,
      //     ignorePattern: '',
      //     ignoreComments: false,
      //     ignoreTrailingComments: false,
      //     ignoreUrls: false,
      //     ignoreStrings: false,
      //     ignoreTemplateLiterals: false,
      //     ignoreRegExpLiterals: false,
      //     ignoreHTMLAttributeValues: false,
      //     ignoreHTMLTextContents: false
      //   }
      // ]
      // 'vue/max-attributes-per-line': [
      //   'error',
      //   {
      //     singleline: {
      //       max: 1
      //     },
      //     multiline: {
      //       max: 1
      //     }
      //   }
      // ]
      // 'vue/singleline-html-element-content-newline': [
      //   'error',
      //   {
      //     ignoreWhenNoAttributes: true,
      //     ignoreWhenEmpty: true,
      //     ignores: ['pre', 'textarea']
      //   }
      // ],
      // 'vue/multiline-html-element-content-newline': [
      //   'error',
      //   {
      //     ignoreWhenEmpty: true,
      //     allowEmptyLines: false,
      //     ignores: ['pre', 'textarea']
      //   }
      // ]
    }
  },
  {
    ignores: ['node_modules/', 'dist/', 'build/', 'docs/']
  }
]
