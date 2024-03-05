<template>
  <Application :width="800" :height="600">
    <container>
    </container>
  </Application>
</template>

<script setup lang="ts">
import { Application } from "vue3-pixi"
</script>

<style scoped lang="scss">
  body {
    margin:0;
    padding:0;
    overflow:hidden;
  }

  canvas {
    display:block;
  }
</style>
