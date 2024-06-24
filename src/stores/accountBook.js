import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import axios from 'axios';

export const useAccountBookStore = defineStore('accountBook', () => {
  const state = reactive({
    income: [],
    expenses: [],
  });

  const BASEURL_INCOME = '/api/income';
  const BASEURL_EXPENSE = '/api/expenses';

  async function fetchIncomeData() {
    try {
      const fetchIncomeDataRes = await axios.get(BASEURL_INCOME);
      state.income = fetchIncomeDataRes.data;
    } catch (error) {
      alert('수입 데이터 통신 Err 발생');
      console.log(error);
    }
  }

  async function fetchExpenseData() {
    try {
      const fetchExpenseDataRes = await axios.get(BASEURL_EXPENSE);
      state.expenses = fetchExpenseDataRes.data;
    } catch (error) {
      alert('지출 데이터 통신 Err 발생');
      console.log(error);
    }
  }

  const accountBookIncome = computed(() => state.income);
  const accountBookExpenses = computed(() => state.expenses);

  const totalIncome = computed(() => {
    return state.income.reduce((total, item) => total + item.amount, 0);
  });

  const totalExpenses = computed(() => {
    return state.expenses.reduce((total, item) => total + item.amount, 0);
  });

  return {
    accountBookIncome,
    accountBookExpenses,
    totalIncome,
    totalExpenses,
    fetchIncomeData,
    fetchExpenseData,
  };
});
