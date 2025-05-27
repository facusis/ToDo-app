<script setup>
  import Footer from './components/Footer.vue';
  import { RouterLink, useRoute } from 'vue-router';

  const route = useRoute(); // Obtienes la ruta actual

</script>

<template>
  <header class="app-header">
    <RouterLink to="/" class="logo">
      TODOAPP
    </RouterLink>
  </header>

  <h1 class="app-title">Bienvenido a TODOAPP</h1>

  <div class="start-button-container" v-if="route.path === '/'">
    <RouterLink to="/home">
      <button class="btn-start">Comencemos</button>
    </RouterLink>
  </div>
  <router-view />
  
  <Footer />
</template>

<style scoped>

.app-header {
  display: flex;
  justify-content: flex-start;
  padding: 20px;
  color: var(--color-text);
}

.logo {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.3s;
}

.app-title {
  font-size: 3rem;
  font-weight: bold;
  color: var(--color-text);
  text-align: center;
  margin-top: 50px;

}

.start-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

.btn-start {
  font-size: 18px;
  font-weight: bold;
  padding: 12px 30px;
  border-radius: 30px;
  cursor: pointer;
  text-transform: uppercase;
  border: 2px solid transparent;
  outline: none;
  background-color: var(--color-primary);
  color: white;
  transition: all 0.3s ease-in-out;
}

.btn-start:hover {
  background-color: var(--color-secondary);
  color: white;
}

/* Esto garantiza que el footer se quede al final */
footer {
  margin-top: auto;
}
</style>
