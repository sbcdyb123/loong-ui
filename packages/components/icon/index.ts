// 用来整合组件，最终实现导出组件
import { Plugin } from "vue";
import _Icon from "./src/icon.vue";
import { withInstall } from "@loong/utils/install";

const Icon = withInstall(_Icon);

export default Icon; // 支持import单独引入或者app.use

export * from "./src/icon";

// 添加类型，使在模板中能够解析
declare module "vue" {
  export interface GlobalComponents {
    LIcon: typeof Icon;
  }
}
