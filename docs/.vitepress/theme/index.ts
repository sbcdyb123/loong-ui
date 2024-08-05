import DefaultTheme from 'vitepress/theme'
import Icon from '@loong/components/icon'
import '@loong/theme-chalk/src/index.scss'
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(Icon)
  }
}
