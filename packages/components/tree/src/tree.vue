<template>
  <div :class="bem.b()">
    <l-virtual-list :items="flattenTree" :remain="8" :size="35">
      <template #defalut="{ node }">
        <l-tree-node
          :key="node.key"
          :node="node"
          :expanded="isExpanded(node)"
          :loadingKeys="loadingKeys"
          :selectKeys="selectKeysRef"
          :showCheckbox="showCheckbox"
          :checked="isChecked(node)"
          :disabled="isDisabled(node)"
          :indeterminate="isIndeterminate(node)"
          @select="handleSelect"
          @toggle="toggleExpand"
          @check="toggleCheck"
        >
        </l-tree-node>
      </template>
    </l-virtual-list>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, provide, ref, useSlots, watch } from 'vue'
import {
  key,
  treeEmitts,
  treeInjectKey,
  TreeNode,
  TreeOption,
  treeProps
} from './tree'
import { createNameSpace } from '@loong/utils/create'
import LTreeNode from './treeNode.vue'
import LVirtualList from '@loong/components/virtual-list/index'
defineOptions({
  name: 'l-tree'
})
const props = defineProps(treeProps)
const tree = ref<TreeNode[]>([])
const bem = createNameSpace('tree')
// 初始化行为
const createActions = (
  keyField: string,
  labelField: string,
  childrenField: string
) => {
  return {
    getKey(node: TreeOption) {
      return node[keyField] as string
    },
    getLabel(node: TreeOption) {
      return node[labelField] as string
    },
    getChildren(node: TreeOption) {
      return node[childrenField] as TreeOption[]
    }
  }
}
const actions = createActions(
  props.keyField,
  props.labelField,
  props.childrenField
)
// 初始化树结构
const createTree = (data: TreeOption[], parent?: TreeNode): TreeNode[] => {
  // 递归
  function traversal(data: TreeOption[], parent?: TreeNode): TreeNode[] {
    return data.map(node => {
      const children = actions.getChildren(node) || []
      const treeNode: TreeNode = {
        key: actions.getKey(node),
        label: actions.getLabel(node),
        children: [],
        rawNode: node,
        level: parent ? parent.level + 1 : 0,
        disabled: !!node.disabled,
        // 判断是否是叶子节点
        isLeaf: node.isLeaf ?? children.length === 0,
        parentKey: parent?.key
      }
      if (children.length > 0) {
        treeNode.children = traversal(children, treeNode)
      }
      return treeNode
    })
  }
  const result = traversal(data, parent)
  return result
}
// 监控数据变化
watch(
  () => props.data,
  data => {
    tree.value = createTree(data)
  },
  {
    immediate: true
  }
)
const expandedKeysSet = ref(new Set(props.defalutExpandedKeys))
const flattenTree = computed(() => {
  let expandedKey = expandedKeysSet.value // 要展开的key
  // 最终拍平的节点
  let flattenNode: TreeNode[] = []

  const nodes = tree.value || [] //被格式化后的节点

  const stack: TreeNode[] = [] //用于遍历树的栈

  for (let i = nodes.length - 1; i >= 0; --i) {
    stack.push(nodes[i])
  }
  while (stack.length) {
    const node = stack.pop()
    if (!node) continue
    flattenNode.push(node)
    if (expandedKey.has(node.key)) {
      const children = node.children
      if (children) {
        for (let i = children.length - 1; i >= 0; --i) {
          stack.push(node.children[i])
        }
      }
    }
  }
  return flattenNode
})
function isExpanded(node: TreeNode): boolean {
  return expandedKeysSet.value.has(node.key)
}
// 折叠
function collpase(node: TreeNode) {
  expandedKeysSet.value.delete(node.key)
}
// 展开
const loadingKeys = ref(new Set<key>())
const triggerLoading = (node: TreeNode) => {
  if (!node.children.length && !node.isLeaf) {
    if (!loadingKeys.value.has(node.key) && !loadingKeys.value.has(node.key)) {
      loadingKeys.value.add(node.key)
      if (props.onLoad) {
        props.onLoad(node.rawNode).then(children => {
          node.rawNode.children = children
          node.children = createTree(children, node)
          loadingKeys.value.delete(node.key)
        })
      }
    }
  }
}
function expand(node: TreeNode) {
  expandedKeysSet.value.add(node.key)
  triggerLoading(node)
}
// 切换
function toggleExpand(node: TreeNode) {
  const expandKeys = expandedKeysSet.value
  if (expandKeys.has(node.key)) {
    collpase(node)
  } else {
    expand(node)
  }
}

// 实现选中节点
const emit = defineEmits(treeEmitts)

const selectKeysRef = ref<key[]>([])

watch(
  () => props.selectedKeys,
  keys => {
    if (keys) {
      selectKeysRef.value = keys
    }
  },
  {
    immediate: true
  }
)
const handleSelect = (node: TreeNode) => {
  let keys = Array.from(selectKeysRef.value)

  if (!props.selectable) return
  if (props.multiple) {
    const index = keys.findIndex(key => key === node.key)
    if (index > -1) {
      keys.splice(index)
    } else {
      keys.push(node.key)
    }
  } else {
    if (keys.includes(node.key)) {
      keys = []
    } else {
      keys = [node.key]
    }
  }
  emit('update:selectedKeys', keys)
}

provide(treeInjectKey, {
  slots: useSlots()
})

const checkedKeysRefs = ref(new Set(props.defalutCheckedKeys))

function isChecked(node: TreeNode) {
  return checkedKeysRefs.value.has(node.key)
}
function isDisabled(node: TreeNode) {
  return !!node.disabled
}
const indeterminateRefs = ref<Set<key>>(new Set())

function isIndeterminate(node: TreeNode) {
  return indeterminateRefs.value.has(node.key)
}
function toggle(node: TreeNode, checked: boolean) {
  if (!node) return
  const checkedKeys = checkedKeysRefs.value
  if (checked) {
    indeterminateRefs.value.delete(node.key)
  }
  checkedKeys[checked ? 'add' : 'delete'](node.key)
  if (node.children) {
    node.children.forEach(child => {
      if (!child.disabled) {
        toggleCheck(child, checked)
      }
    })
  }
}
function toggleCheck(node: TreeNode, checked: boolean) {
  toggle(node, checked)
  updateCheckedKeys(node)
}
function findNode(key: key) {
  return flattenTree.value.find(node => node.key === key)
}
function updateCheckedKeys(node: TreeNode) {
  if (node.parentKey) {
    const parentNode = findNode(node.parentKey)
    if (parentNode) {
      let allChecked = true
      let hasChecked = false
      let nodes = parentNode.children
      for (const node of nodes) {
        if (checkedKeysRefs.value.has(node.key)) {
          hasChecked = true
        } else if (indeterminateRefs.value.has(node.key)) {
          allChecked = false
          hasChecked = true
        } else {
          allChecked = false
        }
      }
      if (allChecked) {
        checkedKeysRefs.value.add(parentNode.key)
        indeterminateRefs.value.delete(parentNode.key)
      } else if (hasChecked) {
        checkedKeysRefs.value.delete(parentNode.key)
        indeterminateRefs.value.add(parentNode.key)
      }
      updateCheckedKeys(parentNode)
    }
  }
}
onMounted(() => {
  checkedKeysRefs.value.forEach((key: any) => {
    toggle(findNode(key)!, true)
  })
})
</script>

<style scoped></style>
