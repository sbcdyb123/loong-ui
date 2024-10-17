import { ExtractPropTypes, InjectionKey, PropType, SetupContext } from 'vue'

export type key = string | number

export interface TreeNode extends Required<TreeOption> {
  level: number
  rawNode: TreeOption
  children: TreeNode[]
  isLeaf: boolean
}

export interface TreeOption {
  label?: key
  key?: key
  children?: TreeOption[]
  isLeaf?: boolean
  disabled?: boolean
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
  },
  onLoad: Function as PropType<(node: TreeOption) => Promise<TreeOption[]>>,
  selectedKeys: {
    type: Array as PropType<key[]>
  },
  selectable: {
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    default: false
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
  },
  loadingKeys: {
    type: Set as PropType<Set<key>>,
    required: true
  },
  selectKeys: {
    type: Array as PropType<key[]>,
    default: () => []
  }
} as const
export const treeNodeEmitts = {
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node
} as const
export const treeEmitts = {
  'update:selectedKeys': (keys: key[]) => keys
} as const
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>
export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>
// export type IconInstance = InstanceType<typeof Icon>;

export interface TreeContext {
  slots: SetupContext['slots']
  // emit: SetupContext<typeof treeEmitts>['emit']
}

export const treeInjectKey: InjectionKey<TreeContext> = Symbol()

export const treeNodeContentProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  }
}
