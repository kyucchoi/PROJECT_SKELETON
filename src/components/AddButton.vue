<template>
  <button class="svg-button"></button>
</template>

<script setup>
import AddButton from '@/assets/plus-circle-fill.svg';
</script>

<style scoped>
.svg-button {
  width: 50px; /* SVG의 너비에 맞게 조정 */
  height: 50px; /* SVG의 높이에 맞게 조정 */
  background-image: url('@/assets/plus-circle-fill.svg');
  background-size: cover;
  background-position: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>
