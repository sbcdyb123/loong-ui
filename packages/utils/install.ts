import { SFCWithInstall } from "./typescript";

export function withInstall<T>(comp: T) {
  (comp as SFCWithInstall<T>).install = function (app) {
    const { name } = comp as unknown as { name: string };

    app.component(name, comp); // 注册全局组件
  };
  return comp as SFCWithInstall<T>;
}
