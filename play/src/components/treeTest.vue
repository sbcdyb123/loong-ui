<template>
  <l-tree
    :data="data"
    v-model:selected-keys="value"
    multiple
    selectable
    show-checkbox
    :defalut-checked-keys="['40']"
  >
    <template #defalut="{ node }"> {{ node.key }}-{{ node.label }} </template>
  </l-tree>
</template>

<script setup lang="ts">
import { key, TreeOption } from '@loong/components/tree'
import { ref } from 'vue'
defineOptions({
  name: 'TreeTest'
})
const props = defineProps({
  msg: {
    type: String,
    default: 'treeTest'
  }
})
function createData(level = 4, baseKey = ''): any {
  if (!level) return undefined
  const arr = new Array(30 - level).fill(0)
  return arr.map((_, index: number) => {
    const key = `${baseKey}${level}${index}`
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key)
    }
  })
}

function createLabel(level: number): string {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}
// function createData() {
//   return [
//     {
//       label: nextLabel(),
//       key: 1,
//       isLeaf: false
//     },
//     {
//       label: nextLabel(),
//       key: 2,
//       isLeaf: false
//     }
//   ]
// }

// function nextLabel(currentLabel?: string | number): string {
//   if (!currentLabel) return 'Out of Tao, One is born'
//   if (currentLabel === 'Out of Tao, One is born') return 'Out of One, Two'
//   if (currentLabel === 'Out of One, Two') return 'Out of Two, Three'
//   if (currentLabel === 'Out of Two, Three') {
//     return 'Out of Three, the created universe'
//   }
//   if (currentLabel === 'Out of Three, the created universe') {
//     return 'Out of Tao, One is born'
//   }
//   return ''
// }
// const handleLoad = (node: TreeOption) => {
//   return new Promise<TreeOption[]>(resolve => {
//     setTimeout(() => {
//       resolve([
//         {
//           label: nextLabel(node.label),
//           key: node.key + nextLabel(node.label),
//           isLeaf: false
//         }
//       ])
//     }, 1000)
//   })
// }
const data = ref(createData())
// const data = ref([
//   {
//     key: '0',
//     label: '0',
//     children: [
//       {
//         key: '0-0',
//         label: '0-0'
//       },
//       {
//         disabled: true,
//         key: '0-1',
//         label: '0-1',
//         children: [
//           {
//             label: '0-1-0',
//             key: '0-1-0'
//           },
//           {
//             label: '0-1-1',
//             key: '0-1-1'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     key: '1',
//     label: '1',
//     children: [
//       {
//         key: '1-0',
//         label: '1-0'
//       },
//       {
//         key: '1-1',
//         label: '1-1',
//         children: [
//           {
//             label: '1-1-0',
//             key: '1-1-0'
//           },
//           {
//             label: '1-1-1',
//             key: '1-1-1'
//           }
//         ]
//       }
//     ]
//   }
// ])
const value = ref<key[]>([])
</script>

<style lang="scss" scoped></style>
