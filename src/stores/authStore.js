import { defineStore } from 'pinia';
import { supabase } from '@/api/supabase/index';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, // El usuario autenticado
    errorMessage: '',
    successMessage: '',
  }),

  actions: {
    // Función para registrar al usuario
    async registerUser(email, password, name) {
      try {
        const { user, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });

        if (error) {
          this.errorMessage = error.message; // Guardamos el mensaje de error
          return false;
        }

        this.successRegisteredMessage = 'Usuario registrado correctamente';
        this.user = user; // Guardamos el usuario en el estado
        return true;
      } catch (error) {
        this.errorRegisteredMessage = 'Hubo un problema al crear el usuario.';
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
        this.successMessage = 'Usuario logueado correctamente. Bienvenido!';
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
      this.successLogOutMessage = 'Has cerrado sesión correctamente.';

    },

    // Función para comprobar si el usuario está autenticado
    isAuthenticated() {
      return this.user !== null;
    },

    // Función para escuchar los eventos de autenticación de Supabase
    listenToAuthChanges() {
      supabase.auth.onAuthStateChange((event, session) => {
        console.log('Evento de autenticación:', event);
        if (event === 'SIGNED_IN') {
          this.user = session.user; // Guardamos el usuario cuando se loguea
        } else if (event === 'SIGNED_OUT') {
          this.user = null; // Limpiamos el usuario cuando se cierra sesión
          this.successMessage = 'Has cerrado sesión correctamente.';
        }
      });
    }
  },
});

