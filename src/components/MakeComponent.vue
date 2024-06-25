<template>
  <div>
    <div
      class="history-container"
      v-for="(ordered, index) of orderedDate"
      :key="index"
      @click="handleItemClick(index)"
    >
      <div class="left-column">
        <div class="d-flex">
          <div>{{ ordered.description }}</div>
          <button
            class="delete-icon"
            alt="#"
            v-show="selectedItemIndex === index && deleteButtonVisible"
            @click.stop="handleDeleteClick(ordered.id, ordered.mark)"
          >
            <img :src="DeleteIcon" />
          </button>
        </div>
        <div class="text-muted small">{{ ordered.date }}</div>
      </div>

      <div class="right-column">
        {{ ordered.mark }}{{ formatNumber(ordered.amount) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, computed } from 'vue';
import { useChangeStore } from '@/stores/changedb.js';
import DeleteIcon from '@/assets/trash3-fill.svg';

const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const changeStore = useChangeStore();
const { fetchListOrder } = changeStore;
const orderedDate = computed(() => changeStore.computedOrderedDate);
const selectedItemIndex = ref(null);
const deleteButtonVisible = ref(false);

const handleItemClick = (index) => {
  if (selectedItemIndex.value === index) {
    deleteButtonVisible.value = !deleteButtonVisible.value;
  } else {
    selectedItemIndex.value = index;
    deleteButtonVisible.value = true;
  }
};

const handleDeleteClick = async (index, type) => {
  try {
    let url;
    if (type === '+') {
      url = `${import.meta.env.VITE_BASE_URL}/income/${index}`;
    } else if (type === '-') {
      url = `${import.meta.env.VITE_BASE_URL}/expenses/${index}`;
    } else {
      console.error('유효하지 않은 유형입니다.');
      return;
    }
    // 서버로 해당 항목을 삭제하는 요청을 보냄
    const response = await axios.delete(url);
    if (response.status === 200) {
      // 성공적으로 삭제된 경우 해당 항목을 화면에서도 삭제
      orderedDate.value.splice(index, 1);
      // 삭제 후 삭제 버튼 숨김
      selectedItemIndex.value = null;
      deleteButtonVisible.value = false;
    } else {
      console.error('삭제 요청에 실패했습니다.');
    }
    fetchListOrder();
  } catch (error) {
    console.error('삭제 요청 중 오류가 발생했습니다:', error);
  }
};
</script>

<style scoped>
.history-container {
  background: white;
  width: 100%;
  height: 76px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  margin-bottom: 1rem;
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
}

.left-column {
  display: flex;
  flex-direction: column;
}

.right-column {
  font-weight: bold;
}

.delete-icon {
  border: none;
  background: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
