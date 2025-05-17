<template>
  <div class="register-container">
    <div class="form-wrapper">
      <h2 class="form-title">Registro</h2>
      <p class="form-description">Ingresa tus datos para crear una cuenta.</p>

      <form @submit.prevent="registerUser">
        <input
          v-model="username"
          type="text"
          placeholder="Nombre de usuario"
          class="input-field"
          required
        />
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
        <button type="submit" class="submit-btn">Registrarse</button>
      </form>

      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';  // Usamos el store de 'auth'
import { useRouter } from 'vue-router';  // Usamos vue-router para navegar

const authStore = useAuthStore();  // Usamos el store para manejar autenticación
const router = useRouter();  // Usamos router para redirigir

const username = ref('');
const email = ref('');
const password = ref('');

// Función para registrar al usuario
const registerUser = async () => {
  const result = await authStore.registerUser(email.value, password.value, username.value);

  if (result) {
    // Hacer algo tras el registro exitoso
    setTimeout(() => {
      router.push('/projects');  // Redirigir a la página de proyectos
    }, 2000);
  }
};
</script>


<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--color-background);
}

.form-wrapper {
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: #2b2b44;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.form-title {
  font-size: 40px;
  margin: 0;
  color: var(--color-text);
}

.form-description {
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
  color: var(--color-text);
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
  background-color: var(--color-primary);
  text-decoration: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  transition: 0.3s;
}

.submit-btn:hover {
  background-color: var(--color-secondary);
}

.success-message {
  color: rgb(120, 224, 35);
  font-size: 1.5rem;
}
</style>
