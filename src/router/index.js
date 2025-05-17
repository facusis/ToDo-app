import { createRouter, createWebHistory } from 'vue-router';
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
      component: ProjectsView,  // Asignar el componente de proyectos
    },
  ],
});

export default router;
