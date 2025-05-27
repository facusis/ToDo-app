<template>
  <div class="projects-container">
    <!-- Modal para agregar tarea -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-container">
        <button class="close-btn" @click="closeModal">x</button>
        <h3 class="modal-title">Nueva Tarea</h3>
        <form @submit.prevent="addTask">
          <input 
            v-model="taskTitle" 
            type="text" 
            placeholder="Título de la tarea" 
            class="input-field" 
            required
          />
          <textarea 
            v-model="taskDescription" 
            placeholder="Descripción de la tarea" 
            class="textarea-field" 
            required
          ></textarea>
          <button type="submit" class="submit-btn">Agregar Tarea</button>
        </form>
      </div>
    </div>

    <!-- Botón para abrir el modal -->
    <button @click="openModal" class="add-task-btn">Agregar Tarea</button>

    <!-- Mostrar las tareas si ya existen -->
    <div v-if="tasks.length" class="task-list">
      <div v-for="task in tasks" :key="task.id" class="task-item">
        <h4>{{ task.title }}</h4>
        <p>{{ task.description }}</p>
        <p class="task-date">{{ task.date }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';  // Usamos el store para autenticación
import { supabase } from '@/api/supabase/index';  // Conexión a Supabase
import { useRouter } from 'vue-router';
import LogoutButton from '@/components/LogOutButton.vue';

const authStore = useAuthStore();
const router = useRouter();
const showModal = ref(false);
const taskTitle = ref('');
const taskDescription = ref('');
const taskDate = ref(new Date().toLocaleDateString());
const tasks = ref([]);  // Lista de tareas

// Verificar si el usuario está autenticado al montar el componente
if (!authStore.isAuthenticated()) {
  router.push('/');  // Si no está autenticado, redirigir al Home
}

// Función para abrir el modal
const openModal = () => {
  showModal.value = true;
};

// Función para cerrar el modal
const closeModal = () => {
  showModal.value = false;
  taskTitle.value = '';  // Limpiar campo de título
  taskDescription.value = '';  // Limpiar campo de descripción
};

// Función para agregar tarea
const addTask = async () => {
  const newTask = {
    title: taskTitle.value,
    description: taskDescription.value,
    date: taskDate.value,
    user_id: authStore.user.id,  // Asociar la tarea con el usuario autenticado
  };

  // Guardar la tarea en Supabase
  const { data, error } = await supabase
    .from('tasks')
    .insert([newTask]);

  if (error) {
    console.error('Error al agregar tarea:', error);
    return;
  }

  tasks.value.push(data[0]);  // Añadir la nueva tarea a la lista
  closeModal();
};

// Función para cargar las tareas al inicio
const loadTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', authStore.user.id);  // Filtrar tareas por usuario

  if (error) {
    console.error('Error al cargar las tareas:', error);
    return;
  }

  tasks.value = data;
};

// Cargar tareas cuando se monta el componente
loadTasks();
</script>

<style scoped>
.projects-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-task-btn {
  font-size: 18px;
  padding: 10px 20px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-task-btn:hover {
  background-color: var(--color-secondary);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  background-color: #2b2b44;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
  position: relative;
}

.close-btn {
  background-color: transparent;
  color: white;
  font-size: 20px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

.modal-title {
  font-size: 24px;
  color: var(--color-text);
  margin-bottom: 10px;
}

.input-field, .textarea-field {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.textarea-field {
  height: 100px;
}

.submit-btn {
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 12px;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: var(--color-secondary);
}

.task-list {
  margin-top: 20px;
  width: 100%;
}

.task-item {
  background-color: #2b2b44;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  text-align: left;
}

.task-date {
  font-size: 12px;
  color: #bbb;
}
</style>
