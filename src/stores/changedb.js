import { ref, computed } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia';

const BASEURL = import.meta.env.VITE_BASE_URL;

export const useChangeStore = defineStore('changedb', () => {
  const currentMonth = new Date().getMonth() + 1;
  const transaction = ref([]);
  const orderedDate = ref([]);
  const tmp = ref([]);
  const tot_income = ref(0);
  const tot_expenses = ref(0);
  const select_month = ref(currentMonth);
  const months = ref([
    { value: 1, label: '1월' },
    { value: 2, label: '2월' },
    { value: 3, label: '3월' },
    { value: 4, label: '4월' },
    { value: 5, label: '5월' },
    { value: 6, label: '6월' },
    { value: 7, label: '7월' },
    { value: 8, label: '8월' },
    { value: 9, label: '9월' },
    { value: 10, label: '10월' },
    { value: 11, label: '11월' },
    { value: 12, label: '12월' },
  ]);

  async function fetchListOrder() {
    transaction.value = [];
    orderedDate.value = [];
    tmp.value = [];
    tot_income.value = 0;
    tot_expenses.value = 0;

    try {
      const url_income = `${BASEURL}/income`;
      const user_income = await axios.get(url_income);
      // console.log("user_income", user_income.data);

      for (let i = 0; i < user_income.data.length; i++) {
        user_income.data[i].check = '입금';
        user_income.data[i].mark = '+';
        // delete user_income.data[i].id;
        transaction.value.push(user_income.data[i]);
      }

      const url_expenses = `${BASEURL}/expenses`;
      const user_expenses = await axios.get(url_expenses);
      // console.log("user_expenses", user_expenses);

      for (let i = 0; i < user_expenses.data.length; i++) {
        user_expenses.data[i].check = '지출';
        user_expenses.data[i].mark = '-';
        // d    elete user_expenses.data[i].id;
        transaction.value.push(user_expenses.data[i]);
      }
      // console.log("transaction", transaction.value);

      orderedDate.value = transaction.value
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .reverse();

      for (let i = 0; i < orderedDate.value.length; i++) {
        if (
          Number(orderedDate.value[i].date.slice(5, 7)) === select_month.value
        ) {
          tmp.value.push(orderedDate.value[i]);
        }
      }
      console.log('tmp : ', tmp.value);
      orderedDate.value = [...tmp.value];

      console.log('orderedDate', orderedDate.value);

      for (let i = 0; i < orderedDate.value.length; i++) {
        if (orderedDate.value[i].mark === '+') {
          tot_income.value = tot_income.value + orderedDate.value[i].amount;
        }
      }
      console.log('+++++++++', tot_income.value);

      for (let i = 0; i < orderedDate.value.length; i++) {
        if (orderedDate.value[i].mark === '-') {
          tot_expenses.value = tot_expenses.value + orderedDate.value[i].amount;
        }
      }
      console.log('---------', tot_expenses.value);
    } catch (e) {
      console.log(`${BASEURL}/income`);
      alert('데이터 불러오기 문제 발생!');
      console.log(e);
    }
  }

  function changeSelectMonth(month) {
    select_month.value = month;
  }

  const computedOrderedDate = computed(() => orderedDate.value);

  fetchListOrder();
  return {
    transaction,
    computedOrderedDate,
    months,
    select_month,
    tot_income,
    tot_expenses,
    changeSelectMonth,
    fetchListOrder,
  };
});
