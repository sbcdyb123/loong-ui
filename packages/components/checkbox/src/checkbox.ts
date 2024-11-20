import { ExtractPropTypes, PropType } from 'vue'

export const checkboxProps = {
  modelValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>
  },
  indeterminate: {
    type: Boolean as PropType<boolean>
  },
  disabled: {
    type: Boolean as PropType<boolean>
  },
  label: {
    type: String as PropType<string>
  }
} as const
export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
// export type IconInstance = InstanceType<typeof Icon>;

export const checkboxEmits = {
  'update:modelValue': (value: boolean | string | number) =>
    typeof value === 'boolean',
  change: (value: boolean) => typeof value === 'boolean'
}

export type CheckboxEmits = typeof checkboxEmits
