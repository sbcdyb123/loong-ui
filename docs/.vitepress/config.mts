import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'loong-ui',
  description: '组件库',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/guide/installation', activeMatch: '/guide' },
      { text: '组件', link: '/components/icon', activeMatch: '/components' }
    ],
    sidebar: {
      '/guide': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/guide/installation' },
            { text: '快速开始', link: '/guide/quickStart' }
          ]
        }
      ],
      '/components': [
        {
          text: '组件',
          items: [
            { text: 'Icon 图标', link: '/components/icon' }
            // { text: 'Button 按钮', link: '/components/button' }
          ]
        }
      ]
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
  }
})
