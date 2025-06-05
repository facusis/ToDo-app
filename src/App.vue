<script setup>
import Footer from './components/Footer.vue';
import LogoutButton from './components/LogoutButton.vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute(); // Ruta actual
</script>

<template>
  <!-- Barra de navegación -->
  <nav class="navbar">
    <RouterLink to="/" class="navbar-logo">TODOAPP</RouterLink>

    <div v-if="route.path === '/projects'">
      <LogoutButton />
    </div>
  </nav>

  <!-- Título de bienvenida -->
  <h1 class="app-title">Bienvenido a TODOAPP</h1>

  <!-- Botón solo visible en Home -->
  <div class="start-button-container" v-if="route.path === '/'">
    <RouterLink to="/home">
      <button class="btn-start">Comencemos</button>
    </RouterLink>
  </div>

  <router-view />
  <Footer />
</template>

<style scoped>
/* NavBar */
.navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.navbar-logo {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.3s;
}

/* Título principal */
.app-title {
  font-size: 3rem;
  font-weight: bold;
  color: var(--color-text);
  text-align: center;
  margin-top: 20px;
}

/* Botón de inicio */
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

/* Footer al fondo */
footer {
  margin-top: auto;
}
</style>
