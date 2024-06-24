<template>
  <div>
    <select class="year-select" v-model="selectedYear">
      <option v-for="year in selectYear" :value="year" :key="year">
        {{ year }}년
      </option>
    </select>
    <select class="month-select" v-model="selectedMonth" @change="changeMonth">
      <option v-for="month in 12" :value="month" :key="month">
        {{ month }}월
      </option>
    </select>
    <div class="title" v-if="shouldShowMostCategory">
      가장 많은 지출을 한 카테고리는<br />
      <span class="emphasis" :style="{ color: activeColor }">{{
        mostSpentCategory
      }}</span
      >입니다!
    </div>
    <div class="title equal-height" v-if="shouldShowText">
      이번 달은 <br />지출 내역이 없습니다!
    </div>
    <div class="chart-container">
      <DoughnutChart
        :chart-data="chartData"
        :chart-options="chartOptions"
        class="chart"
        :key="chartDataKey"
      />
    </div>

    <ul class="category-list">
      <li v-for="expenses in reactiveExpensesArray" :key="expenses.id">
        <span class="circle" :style="{ backgroundColor: expenses.color }">
          {{ expenses.percentage }}%
        </span>
        <span class="category-name category-text">{{ expenses.category }}</span>
        <span class="category-text">{{
          expenses.amount.toLocaleString()
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue';
import { useAccountBookStore } from '@/stores/accountBook.js';
import DoughnutChart from '@/components/DoughnutChart.vue';

const accountBookStore = useAccountBookStore();
const { fetchExpenseData } = accountBookStore;

const mostSpentCategory = ref('');
const totalAmount = ref(0);
const selectedMonth = ref(new Date().getMonth() + 1);
const selectedYear = ref(new Date().getFullYear());
const activeColor = ref('');
const chartDataKey = ref(0);
const selectYear = [2022, 2023, 2024];

const chartData = reactive({
  labels: [],
  datasets: [
    {
      label: 'Data',
      backgroundColor: [],
      data: [],
    },
  ],
});
const chartOptions = reactive({
  plugins: {
    legend: {
      display: false,
    },
  },
  layout: {
    padding: {
      top: 20,
      bottom: 20,
    },
  },
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
  responsive: true,
  // maintainAspectRatio: false,
  animation: {
    animateScale: true,
    animateRotate: true,
  },
});

const reactiveExpensesArray = reactive([
  { category: '식비', amount: 0, color: '#0DC9B9', percentage: 0 },
  {
    category: '교통비',
    amount: 0,
    color: '#FFE70E',
    percentage: 0,
  },
  {
    category: '적금',
    amount: 0,
    color: '#41B6E8',
    percentage: 0,
  },
  {
    category: '쇼핑',
    amount: 0,
    color: '#E982AD',
    percentage: 0,
  },
  {
    category: '이체',
    amount: 0,
    color: '#9771EF',
    percentage: 0,
  },
]);

function updateData(month) {
  const foodExpenses = accountBookStore.accountBookExpenses
    .filter((item) => item.category === '식비')
    .filter((item) => parseInt(item.date.slice(5, 7)) === parseInt(month))
    .reduce((acc, cur) => (acc += parseInt(cur.amount)), 0);
  const transportationExpenses = accountBookStore.accountBookExpenses
    .filter((item) => item.category === '교통비')
    .filter((item) => parseInt(item.date.slice(5, 7)) === parseInt(month))
    .reduce((acc, cur) => (acc += parseInt(cur.amount)), 0);
  const savingsExpenses = accountBookStore.accountBookExpenses
    .filter((item) => item.category === '적금')
    .filter((item) => parseInt(item.date.slice(5, 7)) === parseInt(month))
    .reduce((acc, cur) => (acc += parseInt(cur.amount)), 0);
  const shoppingExpenses = accountBookStore.accountBookExpenses
    .filter((item) => item.category === '쇼핑')
    .filter((item) => parseInt(item.date.slice(5, 7)) === parseInt(month))
    .reduce((acc, cur) => (acc += parseInt(cur.amount)), 0);
  const transferExpenses = accountBookStore.accountBookExpenses
    .filter((item) => item.category === '이체')
    .filter((item) => parseInt(item.date.slice(5, 7)) === parseInt(month))
    .reduce((acc, cur) => (acc += parseInt(cur.amount)), 0);

  reactiveExpensesArray.find((item) => item.category === '식비').amount =
    foodExpenses;
  reactiveExpensesArray.find((item) => item.category === '교통비').amount =
    transportationExpenses;
  reactiveExpensesArray.find((item) => item.category === '적금').amount =
    savingsExpenses;
  reactiveExpensesArray.find((item) => item.category === '쇼핑').amount =
    shoppingExpenses;
  reactiveExpensesArray.find((item) => item.category === '이체').amount =
    transferExpenses;

  totalAmount.value =
    foodExpenses +
    transportationExpenses +
    savingsExpenses +
    shoppingExpenses +
    transferExpenses;

  if (totalAmount.value === 0) {
    reactiveExpensesArray.forEach((item) => (item.percentage = 0));
  } else {
    reactiveExpensesArray.find((item) => item.category === '식비').percentage =
      Math.round((foodExpenses / totalAmount.value) * 100);
    reactiveExpensesArray.find(
      (item) => item.category === '교통비'
    ).percentage = Math.round(
      (transportationExpenses / totalAmount.value) * 100
    );
    reactiveExpensesArray.find((item) => item.category === '적금').percentage =
      Math.round((savingsExpenses / totalAmount.value) * 100);
    reactiveExpensesArray.find((item) => item.category === '쇼핑').percentage =
      Math.round((shoppingExpenses / totalAmount.value) * 100);
    reactiveExpensesArray.find((item) => item.category === '이체').percentage =
      Math.round((transferExpenses / totalAmount.value) * 100);

    chartData.labels = reactiveExpensesArray
      .sort((a, b) => b.amount - a.amount)
      .map((item) => item.category);

    chartData.datasets[0].data = reactiveExpensesArray
      .sort((a, b) => b.amount - a.amount)
      .map((item) => item.amount);

    chartData.datasets[0].backgroundColor = reactiveExpensesArray
      .sort((a, b) => b.amount - a.amount)
      .map((item) => item.color);
  }

  activeColor.value = reactiveExpensesArray.sort(
    (a, b) => b.amount - a.amount
  )[0].color;

  mostSpentCategory.value = reactiveExpensesArray.sort(
    (a, b) => b.amount - a.amount
  )[0].category;

  chartDataKey.value += 1;
}

const shouldShowMostCategory = computed(() => {
  return totalAmount.value !== 0;
});

const shouldShowText = computed(() => {
  if (totalAmount.value === 0) {
    chartData.labels = ['내역 없음'];
    chartData.datasets[0].data = [1];
    chartData.datasets[0].backgroundColor = ['#cccccc'];
    return true;
  }
  return false;
});

function changeMonth() {
  updateData(selectedMonth.value);
}

fetchExpenseData();

watch(
  () => accountBookStore.accountBookExpenses,
  () => {
    updateData(selectedMonth.value);
  },
  { immediate: true }
);
</script>

<style>
.title {
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #504e64;
  margin: 8px 0px 0px 0px;
}

.emphasis {
  font-weight: 700;
  font-size: 25px;
  color: #0dc9b9;
}
.month-select {
  width: 62px;
  border: 1px solid #c9c9c9;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 7px 3px;
  font-weight: 400;
  font-size: 15px;
  color: #504e64;
  text-align: center;
  outline: none;
  margin: 10px 0px 0px 0px;
}

.month-select:focus {
  border: 1px solid #504e64;
}
.year-select:focus {
  border: 1px solid #504e64;
}
.month-select option .year-select option {
  color: #504e64;
}
.year-select {
  width: 80px;
  border: 1px solid #c9c9c9;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 7px 3px;
  font-weight: 400;
  font-size: 15px;
  color: #504e64;
  text-align: center;
  outline: none;
  margin: 10px 5px 0px 0px;
}
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.equal-height {
  height: 67.5px;
}

.chart {
  width: 240px;
  height: 240px;
}

.category-list {
  list-style: none;
  padding: 0;
  width: 100%;
  text-align: left;
}
.category-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 0px 15px 0px;
  background: white;
  height: 62px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  padding: 1rem;
}

.circle {
  display: inline-block;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.category-name {
  flex-grow: 1;
  padding-left: 10px;
}
.category-text {
  font-size: 18px;
  color: #504e64;
}
</style>
