<template>
  <div :class="bem.b()">
    <div
      :class="bem.e('content')"
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
      <span>{{ node?.label }}</span>
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
const props = defineProps(treeNodeProps)
const emit = defineEmits(treeNodeEmitts)
const bem = createNameSpace('tree-node')
const handleExpand = () => {
  emit('toggle', props.node)
}
const isLoading = computed(() => {
  return props.loadingKeys.has(props.node?.key)
})
</script>

<style lang="scss" scoped></style>
