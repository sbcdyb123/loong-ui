<template>
  <TreeTest></TreeTest>
  <l-icon></l-icon>
  <z-checkbox
    v-model="check"
    :disabled="true"
    :indeterminate="true"
  ></z-checkbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TreeTest from './components/treeTest.vue'
const check = ref(false)
</script>

<style scoped></style>
