import { createApp } from 'vue'
import App from './App.vue'
import Icon from '@loong/components/icon'
import Tree from '@loong/components/tree'
import Checkbox from '@loong/components/checkbox'
import '@loong/theme-chalk/src/index.scss'
const app = createApp(App)

const plugins = [Icon, Tree, Checkbox]
plugins.forEach(plugin => {
  app.use(plugin)
})

app.mount('#app')
