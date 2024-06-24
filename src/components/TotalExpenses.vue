<template>
  <div class="expenses-summary" v-if="totalExpenses !== null">
    <h5><strong>총 지출</strong></h5>
    <h6>{{ formatNumber(totalExpenses) }}원</h6>
  </div>
</template>

<script setup>
import { computed } from 'vue';

import { useChangeStore } from '@/stores/changedb.js';

const changeStore = useChangeStore();
const orderedDate = computed(() => changeStore.computedOrderedDate);

const totalExpenses = computed(() => changeStore.tot_expenses);

const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
</script>

<style scoped>
.expenses-summary {
  width: 160px;
  height: 123px;
  background-color: #56d1a5;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 1rem;

  color: white;
}
</style>
