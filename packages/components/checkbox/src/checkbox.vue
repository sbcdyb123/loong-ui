<template>
  <label :class="bem.b()">
    <span :class="bem.e('input')">
      <input
        type="checkbox"
        v-model="model"
        :disabled="disabled"
        :value="label"
        ref="inputRef"
        @change="handleChange"
      />
    </span>
    <span v-if="$slots.default || label" :class="bem.e('label')">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { createNameSpace } from '@loong/utils/create'
import { checkboxEmits, checkboxProps } from './checkbox'
import { computed, onMounted, ref, watch } from 'vue'
defineOptions({
  name: 'l-checkbox'
})
const bem = createNameSpace('checkbox')
const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)
const model = computed({
  get() {
    return props.modelValue ?? ''
  },
  set(value: string | number | boolean) {
    emit('update:modelValue', value)
  }
})
const inputRef = ref<HTMLInputElement>()
function indeterminate(val?: boolean) {
  if (val && inputRef.value) {
    inputRef.value.indeterminate = val
  }
}
function handleChange(e: Event) {
  const target = e.target as HTMLInputElement
  emit('change', target.checked)
}
watch(() => props.indeterminate, indeterminate)
onMounted(() => {
  indeterminate(props.indeterminate)
})
</script>

<style lang="less" scoped></style>
