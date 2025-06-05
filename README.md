
# 📝 My ToDo App

Una aplicación de lista de tareas desarrollada con **Vue.js**, **Pinia**, **Supabase** y **Vite**. Permite a los usuarios registrarse, iniciar sesión, gestionar sus tareas personales y ver sus progresos de forma visual e intuitiva.

---

## 🚀 Tecnologías utilizadas

- [Vue.js 3](https://vuejs.org/) (Composition API)
- [Pinia](https://pinia.vuejs.org/) (manejo de estado)
- [Vue Router](https://router.vuejs.org/)
- [Supabase](https://supabase.com/) (auth + base de datos)
- [Vite](https://vitejs.dev/) (entorno de desarrollo)
- [Netlify](https://netlify.com) (despliegue)
- CSS puro para estilos

---

## ✅ Funcionalidades principales

- Registro de usuario con email y contraseña
- Inicio de sesión y cierre de sesión
- Visualización de tareas personales
- Crear nueva tarea
- Editar tarea existente
- Eliminar tarea
- Marcar tarea como pendiente / en progreso / completada (semáforo)
- Guardado automático en Supabase
- Visualización clara del estado mediante colores y estilo

---

## 📦 Instalación local

1. Cloná el repo:

```bash
git clone https://github.com/tu-usuario/my-todo-app.git
cd my-todo-app
``` 

2. Instalá dependencias:

```bash
npm install
```

3. Configurá tu archivo .env:

```env
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_KEY=tu-clave-secreta
```

4. Corré el proyecto:

```bash
npm run dev

```

🔗 Deploy
Podés probar la app en producción aquí:
👉 https://mi-to-do-app.netlify.app

🧠 Historias de usuario (BDD)
Esta app sigue el enfoque de Behavior Driven Development (BDD), cubriendo las siguientes historias de usuario:

Crear una cuenta
Iniciar sesión
Cerrar sesión
Agregar una tarea
Editar una tarea
Marcar tareas como hechas / pendientes / en progreso
Eliminar tareas


📚 Lecciones aprendidas

Gestión de estado global con Pinia
Manejo de asincronía con async/await
Conexión segura con Supabase
Validaciones básicas
Modularización del código entre vista, store y API

📌 Estado del proyecto
✅ MVP completo y funcional
🧪 Aún se puede mejorar con:

Filtros por estado (pendientes, hechas, en progreso)
Orden por prioridad
Sección de perfil de usuario
Mejora de accesibilidad

👨‍💻 Autor
Facundo Sara