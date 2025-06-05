
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { 
  createProject, 
  getAllProjects, 
  deleteProject, 
  updateProject 
} from '@/api/supabase/projectsApi';

export const useProjectsStore = defineStore('projects', () => {
  // State
  const projects = ref([]);

  // Actions

  // Leer tareas del usuario
  async function readTasks(user_id) {
    try {
      const data = await getAllProjects(user_id);
      projects.value = data;
    } catch (err) {
      console.error('Error al leer tareas:', err);
    }
  }

  // Crear tarea nueva
  async function createTask(title, description, user_id, status = 'pending') {
    try {
      const newTask = await createProject(title, description, user_id, status );
      if (newTask) {
        projects.value.push(newTask); // Lo agregamos arriba
      }
    } catch (err) {
      console.error('Error al crear tarea:', err);
    }
  }

  // Eliminar tarea
  async function deleteTask(id) {
    try {
      const success = await deleteProject(id);
      if (success) {
        projects.value = projects.value.filter(p => p.id !== id);
      }
    } catch (err) {
      console.error('Error al eliminar tarea:', err);
    }
  }

  // Actualizar tarea (por ejemplo, marcar como completada)
  async function updateTask(id, updates) {
    try {
      const updated = await updateProject(id, updates);
      if (updated) {
        const index = projects.value.findIndex(p => p.id === id);
        if (index !== -1) {
          projects.value[index] = updated;
        }
      }
    } catch (err) {
      console.error('Error al actualizar tarea:', err);
    }
  }

  return {
    // State
    projects,

    // Actions
    createTask,
    readTasks,
    deleteTask,
    updateTask,
  };
});
