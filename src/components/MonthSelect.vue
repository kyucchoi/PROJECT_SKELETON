<template>
  <div class="d-flex align-items-center">
    <select
      class="form-select me-3"
      v-model="selectedYear"
      @change="updateYear"
    >
      <option v-for="year in years" :key="year" :value="year">
        {{ year }}년
      </option>
    </select>
    <select class="form-select" v-model="selectedMonth" @change="updateMonth">
      <option v-for="month in months" :key="month.value" :value="month.value">
        {{ month.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();
const selectedMonth = ref(currentMonth);
const selectedYear = ref(currentYear);
const years = Array.from({ length: 3 }, (_, i) => currentYear - i).reverse();

import { useChangeStore } from '@/stores/changedb.js';

const changeStore = useChangeStore();
const { fetchListOrder, changeSelectMonth } = changeStore;
const months = computed(() => changeStore.months);

// const months = ref([
//     { value: 1, label: "1월" },
//     { value: 2, label: "2월" },
//     { value: 3, label: "3월" },
//     { value: 4, label: "4월" },
//     { value: 5, label: "5월" },
//     { value: 6, label: "6월" },
//     { value: 7, label: "7월" },
//     { value: 8, label: "8월" },
//     { value: 9, label: "9월" },
//     { value: 10, label: "10월" },
//     { value: 11, label: "11월" },
//     { value: 12, label: "12월" },
// ]);
const updateYear = () => {
  console.log('선택된 년도:', selectedYear.value);
};

const updateMonth = () => {
  console.log('선택된 월:', selectedMonth.value);
  fetchListOrder();
  changeSelectMonth(selectedMonth.value);
};
</script>
