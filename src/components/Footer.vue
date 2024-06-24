<template>
  <nav class="navbar navbar-expand bg-white border-top">
    <div class="container-fluid">
      <div
        class="navbar-nav d-flex justify-content-around align-items-center w-100"
      >
        <router-link
          :to="{ name: 'category' }"
          class="nav-link d-flex flex-column align-items-center"
        >
          <img :src="CategoryIcon" alt="categoryicon" class="icon" />
        </router-link>
        <router-link
          :to="{ name: 'home' }"
          class="nav-link d-flex flex-column align-items-center"
        >
          <div class="home-circle" @click="showReset">
            <img :src="HomeIcon" alt="homeicon" />
          </div>
        </router-link>
        <router-link
          :to="{ name: 'profile' }"
          class="nav-link d-flex flex-column align-items-center"
        >
          <img :src="ProfileIcon" alt="profileicon" class="icon" />
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import HomeIcon from '@/assets/house-door-fill.svg';
import CategoryIcon from '@/assets/pie-chart-fill.svg';
import ProfileIcon from '@/assets/person-fill.svg';

import { ref } from 'vue';
import { useChangeStore } from '@/stores/changedb.js';
const changeStore = useChangeStore();
const { fetchListOrder, changeSelectMonth } = changeStore;

function showReset() {
  const currentMonth = new Date().getMonth() + 1;
  const selectedMonth = ref(currentMonth);
  changeSelectMonth(selectedMonth.value);
  fetchListOrder();
}
</script>

<style>
.navbar {
  height: 82px;
}

.home-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(
    45deg,
    rgba(19, 63, 219, 0.5),
    rgba(183, 0, 77, 0.4)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s ease;
}

.home-circle:hover {
  transform: scale(1.25);
}

.icon {
  transition: transform 0.4s ease;
}

.icon:hover {
  transform: scale(1.25);
}
</style>
