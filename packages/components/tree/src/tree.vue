<template>
  <div :class="bem.b()">
    <l-tree-node v-for="node in flattenTree" :key="node.key" :node="node" :expanded="isExpanded(node)" @toggle="toggleExpand"> </l-tree-node>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { TreeNode, TreeOption, treeProps } from './tree'
import { createNameSpace } from '@loong/utils/create'
import LTreeNode from './treeNode.vue'
defineOptions({
  name: 'l-tree'
})
const props = defineProps(treeProps)
const tree = ref<TreeNode[]>([])
const bem = createNameSpace('tree')
// 初始化行为
const createActions = (keyField: string, labelField: string, childrenField: string) => {
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
const actions = createActions(props.keyField, props.labelField, props.childrenField)
// 初始化树结构
const createTree = (data: TreeOption[]): TreeNode[] => {
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
        // 判断是否是叶子节点
        isLeft: node.isLeft ?? children.length === 0
      }
      if (children.length > 0) {
        treeNode.children = traversal(children, treeNode)
      }
      return treeNode
    })
  }
  const result = traversal(data)
  return result
}
// 监控数据变化
watch(
  () => props.data,
  data => {
    tree.value = createTree(data)
    console.log(tree.value)
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
function expand(node: TreeNode) {
  expandedKeysSet.value.add(node.key)
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
</script>

<style scoped></style>
