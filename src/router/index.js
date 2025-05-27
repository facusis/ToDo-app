import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import HomeView from '../views/HomeView.vue';  // Asegúrate de importar el componente Home
import RegisterView from '../views/RegisterView.vue';
import ProjectsView from '../views/ProjectsView.vue';  // Asegúrate de importar ProjectsView

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
    },
    {
      path: '/home',  // Ruta adicional para "/home"
      name: 'home',  // nombre para la ruta alternativa
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,  // Asignar el componente de registro
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView, // Asegúrate de que ProjectsView esté correctamente importado
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (!authStore.isAuthenticated()) {
          next({ name: 'home' });  // Si no está autenticado, redirige al home
        } else {
          next();  // Si está autenticado, permite el acceso
        }
      },
    },
  ],
});

export default router;
