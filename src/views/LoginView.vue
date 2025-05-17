<template>
  <div class="login-container">
    <div class="form-wrapper">
      <h1 class="form-title">Iniciar sesión</h1>
      <p class="form-description">Ingresa tus credenciales para acceder.</p>
      <form @submit.prevent="loginUser">
        <input
          v-model="email"
          type="email"
          placeholder="Correo electrónico"
          class="input-field"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          class="input-field"
          required
        />
        <button type="submit" class="submit-btn">Iniciar sesión</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const loginUser = () => {
  // Aquí va la lógica de inicio de sesión, por ejemplo, enviar los datos a una API
  console.log('Usuario logueado', { email: email.value, password: password.value });
};
</script>

<style scoped>
.login-container {
  background-color: #1a1a2e;
  color: #e94560;
  font-family: 'Arial', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.form-wrapper {
  max-width: 600px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 40px;
  margin: 0;
  color: #0f3460;
  text-align: center;
}

.form-description {
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
}

.input-field {
  display: block;
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-btn {
  display: inline-block;
  padding: 12px 20px;
  color: white;
  background-color: #e94560;
  text-decoration: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  transition: 0.3s;
}

.submit-btn:hover {
  background-color: #0f3460;
}
</style>
