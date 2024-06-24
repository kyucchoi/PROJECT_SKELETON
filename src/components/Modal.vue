<template>
  <div class="modal-overlay" v-if="visible">
    <div class="modal2">
      <div class="modal-content">
        <div>
          <h4>내역 추가</h4>
          <hr class="my-2" />
          <div class="row">
            <div class="col">
              <div class="mb-2">
                <label for="date" class="form-label fw-bold">날짜</label>
                <input
                  id="date"
                  type="date"
                  class="form-control"
                  v-model="date"
                />
              </div>
              <div class="mb-2">
                <label for="category" class="form-label fw-bold"
                  >카테고리(내역)</label
                >
                <select id="category" class="form-select" v-model="category">
                  <option>식비</option>
                  <option>교통비</option>
                  <option>적금</option>
                  <option>쇼핑</option>
                  <option>이체</option>
                </select>
              </div>
              <div class="mb-2">
                <label for="description" class="form-label fw-bold">내용</label>
                <input
                  id="description"
                  type="text"
                  class="form-control"
                  v-model="description"
                />
              </div>
              <div class="mb-2">
                <label for="amount" class="form-label fw-bold">금액</label>
                <input
                  id="amount"
                  type="text"
                  class="form-control"
                  v-model="amount"
                />
              </div>
              <div class="mb-2">
                <label class="form-label fw-bold">수입/지출</label>
                <div class="d-flex flex-row">
                  <div class="incomeRadio">
                    <input
                      id="income"
                      type="radio"
                      value="income"
                      v-model="picked"
                    />
                    <label for="income">수입</label>
                  </div>
                  <div class="expensesRadio">
                    <input
                      id="expenses"
                      type="radio"
                      value="expenses"
                      v-model="picked"
                    />
                    <label for="expenses">지출</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-center my-2">
            <div class="col-auto">
              <button
                class="btn shadow comfirm-button mx-4"
                @click="sendComfirm"
              >
                등록
              </button>
            </div>
            <div class="col-auto">
              <button class="btn shadow close-button mx-4" @click="sendClose">
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import axios from 'axios';

import { useChangeStore } from '@/stores/changedb.js';

const changeStore = useChangeStore();
const { fetchListOrder } = changeStore;

const date = ref('');
const amount = ref(0);
const category = ref('');
const description = ref('');
const picked = ref('');

async function fetchList() {
  try {
    const url = 'http://localhost:3000/user';
    const user_data = await axios.get(url);
    console.log('user_data', user_data);
  } catch (e) {
    alert('데이터 불러오기 문제 발생!');
    console.log(e);
  }
}

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close-modal']);

function sendClose() {
  emit('close-modal');
}

async function sendComfirm() {
  // console.log(date.value);
  // console.log(category.value);
  // console.log(description.value);
  // console.log(amount.value);
  // console.log(picked.value);

  if (date.value !== '' && description.value !== '' && amount.value !== 0) {
    if (picked.value === 'income') {
      // emit("date");
      const url = 'http://localhost:3000/income';
      const user_income = await axios.get(url);
      console.log('user_income', user_income);
      try {
        const newData = {
          date: date.value,
          // category: category.value,
          description: description.value,
          amount: Number(amount.value),
        };
        const addData = await axios.post(url, newData);

        if (addData.status !== 201) return alert('저장 실패');

        fetchListOrder();
      } catch (error) {
        alert('작업 중, ERR 발생');
        console.log(error);
      }
    } else if (picked.value !== 'income') {
      const url = 'http://localhost:3000/expenses';
      const user_expenses = await axios.get(url);
      console.log('user_expenses', user_expenses);
      try {
        const newData = {
          date: date.value,
          category: category.value,
          description: description.value,
          amount: Number(amount.value),
        };
        const addData = await axios.post(url, newData);

        if (addData.status !== 201) return alert('저장 실패');

        fetchListOrder();
      } catch (error) {
        alert('작업 중, ERR 발생');
        console.log(error);
      }
    }
    sendClose();
  } else {
    alert('다시 입력해주세요');
  }
}
fetchList();
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal2 {
  position: absolute;
  left: 0;
  top: 0;
  width: 350px;
  height: 520px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
}

.close-button {
  background: #c8c8c8;
  border-radius: 5px;
  border: none;
}

.comfirm-button {
  background: #56d1a5;
  border-radius: 5px;
  border: none;
}

.comfirm-button:hover,
.close-button:hover {
  transform: scale(1.1);
}
.expensesRadio {
  margin-left: 8px;
}
.expensesRadio input {
  margin-right: 5px;
}
.incomeRadio input {
  margin-right: 5px;
}
</style>
