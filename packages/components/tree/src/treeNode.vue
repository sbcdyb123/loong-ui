<template>
  <div
    :class="[
      bem.b(),
      bem.is('selected', isSelected),
      bem.is('disabled', node.disabled)
    ]"
  >
    <div
      :class="[bem.e('content')]"
      :style="{ paddingLeft: `${(node?.level ?? 0) * 16}px` }"
    >
      <span
        :class="[
          bem.e('expand-icon'),
          { expanded: expanded && !node?.isLeft },
          bem.is('leaf', node.isLeaf)
        ]"
        @click="handleExpand"
      >
        <l-icon size="25">
          <Switcher v-if="!isLoading" />
          <Loading v-else />
        </l-icon>
      </span>
      <LCheckbox
        v-if="showCheckbox"
        :model-value="checked"
        :disabled="disabled"
        :indeterminate="indeterminate"
        @change="handleCheckChange"
      />
      <span :class="bem.e('label')" @click="handleSelected">
        <LTreeNodeContent :node="node" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNameSpace } from '@loong/utils/create'
import { treeNodeEmitts, treeNodeProps } from './tree'
import LIcon from '@loong/components/icon'
import Switcher from './icon/Switcher'
import Loading from './icon/Loading'
import { computed } from 'vue'
import LTreeNodeContent from './tree-node-content'
import LCheckbox from '@loong/components/checkbox'
const props = defineProps(treeNodeProps)
const emit = defineEmits(treeNodeEmitts)
const bem = createNameSpace('tree-node')
const handleExpand = () => {
  if (props.node.disabled) return
  emit('toggle', props.node)
}
const isLoading = computed(() => {
  return props.loadingKeys.has(props.node?.key)
})
const isSelected = computed(() => {
  return props.selectKeys.includes(props.node.key)
})
const handleSelected = () => {
  if (props.node.disabled) {
    return
  }
  emit('select', props.node)
}
const handleCheckChange = (value: boolean) => {
  emit('check', props.node, value)
}
</script>

<style lang="scss" scoped></style>
