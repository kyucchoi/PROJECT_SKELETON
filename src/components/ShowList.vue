<template>
  <div>
    <ul class="list-unstyled">
      <MakeComponent />
    </ul>
  </div>
</template>

<script setup>
import MakeComponent from '@/components/MakeComponent.vue';
</script>

<style scoped>
ul {
  height: 450px;
  overflow-y: auto;
  border-radius: 15px;
}

ul::-webkit-scrollbar {
  display: none;
}
</style>
