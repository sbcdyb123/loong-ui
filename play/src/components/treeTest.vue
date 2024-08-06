<template>
  <l-tree :data="data" label-field="label" key-field="key" children-field="children" :defalut-expanded-keys="['40', '41']"></l-tree>
</template>

<script setup lang="ts">
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
  const arr = new Array(6 - level).fill(0)
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

const data = ref(createData())
console.log(data.value)
</script>

<style lang="scss" scoped></style>
