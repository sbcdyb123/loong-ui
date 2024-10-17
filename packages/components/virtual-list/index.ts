// 用来整合组件，最终实现导出组件
import _Virtual from './src/virtual'
import { withInstall } from '@loong/utils/install'

const Virtual = withInstall(_Virtual)

export default Virtual // 支持import单独引入或者app.use

// export * from './src/icon'

// 添加类型，使在模板中能够解析
declare module 'vue' {
  export interface GlobalComponents {
    LVirtualList: typeof Virtual
  }
}
