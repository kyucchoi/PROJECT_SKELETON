<template>
  <div class="incomes-summary" v-if="totalIncomes !== null">
    <h5><strong>총 수입</strong></h5>
    <h6>{{ formatNumber(totalIncomes) }}원</h6>
  </div>
</template>

<script setup>
import { computed } from 'vue';

import { useChangeStore } from '@/stores/changedb.js';

const changeStore = useChangeStore();
const orderedDate = computed(() => changeStore.computedOrderedDate);

const totalIncomes = computed(() => changeStore.tot_income);

const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
</script>

<style scoped>
.incomes-summary {
  width: 160px;
  height: 123px;
  background-color: #56d1a5;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  color: white;
}
</style>
