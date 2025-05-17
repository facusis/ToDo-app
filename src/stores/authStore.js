// src/stores/authStore.js
import { defineStore } from 'pinia';
import { supabase } from '@/api/supabase/index'; // Asegúrate de que la configuración de Supabase esté importada

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    errorMessage: '',
    successMessage: '',
  }),

  actions: {
    // Función para registrar al usuario
    async registerUser(email, password, name) {
      try {
        // Registrar al usuario en Supabase Auth
        const { user, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });

        if (error) {
          this.errorMessage = error.message; // Guardamos el mensaje de error
          return false;
        }

        // Insertamos en la tabla 'users' con el 'user_id' de Supabase Auth
        const { data, insertError } = await supabase
          .from('users')
          .insert([{ user_id: user.id, name: name }]);

        if (insertError) {
          this.errorMessage = insertError.message; // Guardamos el mensaje de error
          return false;
        }

        this.successMessage = 'Usuario registrado correctamente';
        this.user = user; // Guardamos el usuario en el estado
        return true;
      } catch (error) {
        this.errorMessage = 'Hubo un problema al crear el usuario.';
        console.error(error);
        return false;
      }
    },

    // Función para hacer login
    async loginUser(email, password) {
      try {
        const { user, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) {
          this.errorMessage = 'Credenciales inválidas. Intenta de nuevo.';
          return false;
        }

        this.user = user; // Guardamos el usuario en el estado
        this.successMessage = 'Usuario logueado correctamente';
        return true;
      } catch (error) {
        this.errorMessage = 'Error al iniciar sesión.';
        console.error(error);
        return false;
      }
    },

    // Función para logout
    async logoutUser() {
      await supabase.auth.signOut();
      this.user = null;
      this.successMessage = 'Has cerrado sesión correctamente.';
    },
  },
});
