// 用来整合组件，最终实现导出组件
import _Checkbox from './src/checkbox.vue'
import { withInstall } from '@loong/utils/install'

const Checkbox = withInstall(_Checkbox)

export default Checkbox // 支持import单独引入或者app.use

export * from './src/checkbox'

// 添加类型，使在模板中能够解析
declare module 'vue' {
  export interface GlobalComponents {
    LCheckbox: typeof Checkbox
  }
}
