<template>
  <TreeTest></TreeTest>
  <l-icon></l-icon>
  <l-checkbox
    v-model="check"
    :indeterminate="true"
    @change="val => console.log(val)"
    >节点11</l-checkbox
  >
  {{ check }}
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TreeTest from './components/treeTest.vue'
const check = ref(false)
</script>

<style scoped></style>
