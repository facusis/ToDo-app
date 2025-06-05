  <template>
    <div class="projects-container">
      <!-- Modal para agregar tarea -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-container">
          <button class="close-btn" @click="closeModal">x</button>
          <h3 class="modal-title">
            {{ editingTask ? 'Editar Tarea' : 'Nueva Tarea' }}
          </h3>
          <form @submit.prevent="addTask">
            <input v-model="taskTitle" type="text" placeholder="Título de la tarea" class="input-field" required />
            <textarea v-model="taskDescription" placeholder="Descripción de la tarea" class="textarea-field"
              required></textarea>
            <button type="submit" class="submit-btn">
              {{ editingTask ? 'Actualizar Tarea' : 'Agregar Tarea' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Botón para abrir el modal -->
      <div class="add-task">
        <button @click="() => openModal(null)" class="add-task-btn">Agregar Tarea</button>
      </div>

      <!-- Mostrar las tareas si ya existen -->
      <div v-if="projectsStore.projects.length" class="task-list">
        <div v-for="task in projectsStore.projects" :key="task.id" class="task-item">
          <div class="task-header">
            <span class="task-date">{{ task.created_at.slice(0, 10) }}</span>

            <div class="task-status" :class="task.status" :title="{
              pending: 'Pendiente',
              in_progress: 'En proceso',
              done: 'Completada',
            }[task.status]" @click="toggleStatus(task)"></div>

            <div class="task-actions">
              <button class="icon-btn" title="Editar tarea" @click="openModal(task)">✏️</button>
              <button class="icon-btn" title="Eliminar tarea" @click="deleteTask(task.id)">🗑️</button>
            </div>
          </div>

          <h4 class="task-title" :class="task.status">{{ task.title }}</h4>


          <p class="task-description">
            {{ task.description }}
          </p>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useProjectsStore } from '@/stores/projects';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const projectsStore = useProjectsStore();
const router = useRouter();

const showModal = ref(false);
const taskTitle = ref('');
const taskDescription = ref('');
const editingTask = ref(null); // Guarda la tarea a editar

if (!authStore.isAuthenticated()) {
  router.push('/');
}

// Función para abrir el modal
const openModal = (task = null) => {
  if (task) {
    editingTask.value = task;
    taskTitle.value = task.title;
    taskDescription.value = task.description;
  } else {
    // Asegura que no haya tarea en edición
    editingTask.value = null;
    taskTitle.value = '';
    taskDescription.value = '';
  }
  showModal.value = true;
};



// Función para cerrar el modal
const closeModal = () => {
  showModal.value = false;
  taskTitle.value = '';
  taskDescription.value = '';
};

// Crear tarea a través del store
const addTask = async () => {
  if (!taskTitle.value || !taskDescription.value) return;

  if (editingTask.value) {
    await projectsStore.updateTask(editingTask.value.id, {
      title: taskTitle.value,
      description: taskDescription.value,
    });
  } else {
    await projectsStore.createTask(taskTitle.value, taskDescription.value, authStore.user.id);
  }

  closeModal();
};


// Eliminar Tarea a traves del store
const deleteTask = async (id) => {
  const confirmDelete = confirm('¿Seguro que querés eliminar esta tarea?');
  if (!confirmDelete) return;

  await projectsStore.deleteTask(id);
};

// Editar tarea a traves del store
const editTask = (id) => {
  console.log('Editar tarea con ID:', id);
  // En el siguiente paso lo conectamos al modal
};

const toggleStatus = async (task) => {
  const nextStatus = task.status === 'pending'
    ? 'in_progress'
    : task.status === 'in_progress'
    ? 'done'
    : 'pending';

  await projectsStore.updateTask(task.id, { status: nextStatus });

  // Refrescar localmente
  task.status = nextStatus;
};



// Cargar tareas al montar el componente
onMounted(() => {
  projectsStore.readTasks(authStore.user.id);
});
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
  z-index: 1;
}

.modal-container {
  background-color: #2b2b44;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
  position: relative;
  z-index: 1;
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

.input-field,
.textarea-field {
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
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0 20px;
  justify-content: flex-start;
}

.task-item {
  background-color: #2b2b44;
  padding: 15px 20px;
  border-radius: 12px;
  width: 250px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
  position: relative;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #ccc;
}

.task-actions button {
  font-size: 13px;
  padding: 2px 4px;
}

.icon-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #aaa;
  transition: color 0.2s;
}

.icon-btn:hover {
  color: var(--color-primary);
}

.task-title {
  font-size: 24px;
  text-align: center;
  color: var(--color-text);
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.task-description {
  color: #ddd;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  text-align: left;
}

.task-date {
  font-size: 12px;
  color: #bbb;
}

.add-task {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 20px;
}

/* Estado Tareas */
.task-status {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 8px;
  display: inline-block;
  cursor: pointer;
}

.task-title.pending {
  color: #e94560;
}
.task-title.in_progress {
  color: #f1c40f;
}
.task-title.done {
  color: #2ecc71;
}

.task-status.pending {
  background-color: #e94560;
}

.task-status.in_progress {
  background-color: #f1c40f;
}

.task-status.done {
  background-color: #2ecc71;
}

</style>
