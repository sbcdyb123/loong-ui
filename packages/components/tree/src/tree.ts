import { ExtractPropTypes, PropType } from 'vue'

type key = string | number

export interface TreeNode extends Required<TreeOption> {
  level: number
  rawNode: TreeOption
  children: TreeNode[]
  isLeft: boolean
}

export interface TreeOption {
  label?: key
  key?: key
  children?: TreeOption[]
  isLeft?: boolean
  [key: string]: unknown
}

export const treeProps = {
  data: {
    type: Array as PropType<TreeOption[]>,
    default: () => []
  },
  labelField: {
    type: String,
    default: 'label'
  },
  keyField: {
    type: String,
    default: 'key'
  },
  childrenField: {
    type: String,
    default: 'children'
  },
  defalutExpandedKeys: {
    type: Array as PropType<key[]>,
    default: () => []
  }
} as const

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  },
  expanded: {
    type: Boolean,
    required: true
  }
} as const
export const treeNodeEmitts = {
  toggle: (node: TreeNode) => node
} as const
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>
export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>
// export type IconInstance = InstanceType<typeof Icon>;