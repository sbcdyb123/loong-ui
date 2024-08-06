<template>
  <div :class="bem.b()">
    <div :class="bem.e('content')" :style="{ paddingLeft: `${(node?.level ?? 0) * 16}px` }">
      <span :class="[bem.e('expand-icon'), { expanded: expanded && !node?.isLeft }]" @click="handleExpand">
        <l-icon size="16" color="pink">
          <Switcher />
        </l-icon>
      </span>
      <span>{{ node?.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNameSpace } from '@loong/utils/create'
import { treeNodeEmitts, treeNodeProps } from './tree'
import LIcon from '@loong/components/icon'
import Switcher from './icon/Switcher'
const props = defineProps(treeNodeProps)
const emit = defineEmits(treeNodeEmitts)
const bem = createNameSpace('tree-node')
const handleExpand = () => {
  emit('toggle', props.node)
}
</script>

<style lang="scss" scoped></style>
