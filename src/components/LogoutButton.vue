
<template>
  <button @click="logout" class="logout-btn">Cerrar sesión</button>
</template>

<script setup>
  import { useAuthStore } from '@/stores/authStore';
  import { useRouter } from 'vue-router';

  const authStore = useAuthStore();
  const router = useRouter();

  const logout = async () => {
    await authStore.logoutUser();
    router.push('/'); 
  }

</script>

<style scoped>
.logout-btn {
  padding: 10px 20px;
  background-color: #e94560;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #0f3460;
}
</style>
