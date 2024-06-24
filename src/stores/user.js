import { defineStore } from 'pinia';
import { reactive, computed, ref } from 'vue';
import axios from 'axios';

export const useUserStore = defineStore('user', () => {
  const state = reactive({
    user: {},
  });

  // localhost:3000
  const BASEURL = '/api/user';

  async function fetchUserData() {
    try {
      const fetchUserDataRes = await axios.get(BASEURL);

      state.user = fetchUserDataRes.data;
    } catch (error) {
      alert('가계부 데이터 통신 Err 발생');
      console.log(error);
    }
  }

  async function editName(newName) {
    if (newName === '') return alert('이름을 입력해주세요.');
    try {
      const payload = { ...state.user, name: newName };

      const response = await axios.put(`${BASEURL}`, payload);
      fetchUserData();
    } catch (error) {
      alert('이름 변경 오류발생');
      console.log(error);
    }
  }

  async function editGoal(newIncomeGoal, newExpenseGoal) {
    console.log(newIncomeGoal, newExpenseGoal);
    if (newIncomeGoal === '' && newExpenseGoal === '')
      return alert('목표금액을 입력해주세요.');

    try {
      const fetchGoalDataRes = await axios.get(BASEURL);
      let pastIncomeGoalData = fetchGoalDataRes.data.income_goal;
      let pastExpenseGoalData = fetchGoalDataRes.data.expense_goal;
      let payload = {};

      if (newIncomeGoal === '') {
        payload = {
          ...state.user,
          income_goal: pastIncomeGoalData,
          expense_goal: newExpenseGoal,
        };
      } else if (newExpenseGoal === '') {
        payload = {
          ...state.user,
          income_goal: newIncomeGoal,
          expense_goal: pastExpenseGoalData,
        };
      } else {
        payload = {
          ...state.user,
          income_goal: newIncomeGoal,
          expense_goal: newExpenseGoal,
        };
      }

      const response = await axios.put(`${BASEURL}`, payload);
      fetchUserData();
    } catch (error) {
      alert('목표 변경 오류발생');
      console.log(error);
    }
  }

  // async function editIncomeGoal(newGoal) {
  //   try {
  //     const payload = { ...state.user, income_goal: newGoal };

  //     const response = await axios.put(`${BASEURL}`, payload);
  //     fetchUserData();
  //   } catch (error) {
  //     alert('수입목표 변경 오류발생');
  //     console.log(error);
  //   }
  // }

  // async function editExpenseGoal(newGoal) {
  //   try {
  //     const payload = { ...state.user, expense_goal: newGoal };

  //     const response = await axios.put(`${BASEURL}`, payload);
  //     fetchUserData();
  //   } catch (error) {
  //     alert('지출목표 변경 오류발생');
  //     console.log(error);
  //   }
  // }

  async function editCharacter(newCharacter) {
    try {
      const payload = { ...state.user, profilePicture: newCharacter };

      const response = await axios.put(`${BASEURL}`, payload);
      fetchUserData();
    } catch (error) {
      alert('캐릭터 변경 오류발생');
      console.log(error);
    }
  }

  const accountBookUser = computed(() => state);

  return {
    fetchUserData,
    accountBookUser,
    editName,
    // editIncomeGoal,
    // editExpenseGoal,
    editCharacter,
    editGoal,
  };
});
