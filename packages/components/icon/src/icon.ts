import { ExtractPropTypes, PropType } from "vue";
import Icon from "./icon.vue";

export const iconProps = {
  color: String,
  size: [Number, String] as PropType<number | string>,
} as const;

export type IconProps = ExtractPropTypes<typeof iconProps>;
// export type IconInstance = InstanceType<typeof Icon>;
