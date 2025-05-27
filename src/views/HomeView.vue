<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');

// Función para hacer login
const loginUser = async () => {
  console.log('Iniciando login...');

  const result = await authStore.loginUser(email.value, password.value);

  if (result) {
    email.value = '';
    password.value = '';

    // Verificamos si el usuario está autenticado y redirigimos
    if (authStore.isAuthenticated()) {
      console.log('Login exitoso, redirigiendo a /projects...');
      setTimeout(() => {
        router.push('/projects');
      }, 1500);
    } else {
      console.log('Error, no se logró autenticar al usuario');
    }
  } else {
    email.value = '';
    password.value = '';
  }
};

// Verificar si el usuario ya está autenticado al montar el componente
onMounted(() => {
  if (authStore.isAuthenticated()) {
    router.push('/projects');  // Redirigir a proyectos si está autenticado
  }
});

</script>


<template>
  <div class="home-container">
    <div class="form-wrapper" v-if="!authStore.user">
      <h2 class="form-title">Iniciar sesión</h2>
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

      <p v-if="authStore.errorMessage" class="error-message">{{ authStore.errorMessage }}</p>

      <div class="register-link">
        <p>¿No tienes cuenta?</p>
        <RouterLink to="/register" class="btn-register-link">Registrarse</RouterLink>
      </div>
    </div>
  </div>
</template>


<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--color-background);
  overflow: hidden;
}

.form-wrapper {
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: #2b2b44;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  box-sizing: border-box;
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

.register-link {
  margin-top: 20px;
  box-sizing: border-box;
}

.btn-register-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

.btn-register-link:hover {
  color: white;
}

.error-message {
  font-size: 1.5rem;
  color: aqua;
  margin-top: 1rem;
}
</style>
