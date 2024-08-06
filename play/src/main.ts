import { createApp } from 'vue'
import App from './App.vue'
import Icon from '@loong/components/icon'
import Tree from '@loong/components/tree'
import '@loong/theme-chalk/src/index.scss'
const app = createApp(App)

const plugins = [Icon, Tree]
plugins.forEach(plugin => {
  app.use(plugin)
})

app.mount('#app')
