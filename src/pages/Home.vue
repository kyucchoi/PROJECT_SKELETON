<template>
  <div class="home-container">
    <UserProfile class="header" />

    <MonthSelect v-model="selectedMonth" />

    <ModalComponents :visible="isModalVisible" @close-modal="hideModal" />
    <div class="button-area">
      <AddButton button @click="showModal" />
    </div>
    <div class="summary-area">
      <TotalExpenses />
      <TotalIncomes />
    </div>
    <ShowList />
  </div>
</template>

<script setup>
import UserProfile from '@/components/UserProfile.vue';
import AddButton from '@/components/AddButton.vue';
import { ref } from 'vue';
import ModalComponents from '@/components/Modal.vue';
import ShowList from '@/components/ShowList.vue';
import TotalExpenses from '@/components/TotalExpenses.vue';
import TotalIncomes from '@/components/TotalIncomes.vue';
import MonthSelect from '@/components/MonthSelect.vue';

const selectedMonth = ref(null);

const isModalVisible = ref(false);

function showModal() {
  isModalVisible.value = true;
}

function hideModal() {
  isModalVisible.value = false;
}
</script>

<style scoped>
/* .header {
    top: 0;
    left: 0;
} */

.summary-area {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
}

.button-area {
  position: absolute;
  bottom: 100px;
  right: 30px;
  transition: transform 0.4s ease;
  opacity: 0.8;
}

.button-area:hover {
  transform: scale(1.2);
  opacity: 1;
}
</style>
