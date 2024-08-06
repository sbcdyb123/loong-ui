// import { GlobalComponents } from './index';
// 用来整合组件，最终实现导出组件
import { withInstall } from '@loong/utils/install'
import _Tree from './src/tree.vue'

const Tree = withInstall(_Tree)

export default Tree // 支持import单独引入或者app.use

export * from './src/tree'

// 添加类型，使在模板中能够解析
declare module 'vue' {
  export interface GlobalComponents {
    LTree: typeof Tree
  }
}
