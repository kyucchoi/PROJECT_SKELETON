<template>
  <div class="profile-panel" v-if="user">
    <div class="profile-wrapper">
      <img
        :src="user.profilePicture"
        alt="Profile Image"
        class="profile-image"
      />
      <img
        src="@/assets/gradientcircle.svg"
        alt="Gradient Circle"
        class="gradient-circle"
      />
    </div>
    <div class="d-flex flex-column align-items-center mx-3">
      <div class="fs-6">안녕하세요,</div>
      <div class="fw-bold fs-5">{{ user.name }}님</div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const user = ref(null);
const fetchUser = async () => {
  try {
    const response = await axios.get('http://localhost:3000/user');
    user.value = response.data;
  } catch (error) {
    console.error('There was an error fetching the user data:', error);
  }
};

onMounted(() => {
  fetchUser();
});
</script>

<style scoped>
.profile-panel {
  display: flex;
  align-items: center;
  padding: 1rem;
  justify-content: center;
}

.profile-wrapper {
  width: 66px;
  height: 66px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-image {
  border-radius: 50%;
  width: 82%;
  height: 82%;
  object-fit: cover;
}

.gradient-circle {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
