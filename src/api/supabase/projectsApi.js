import { supabase } from "@/api/supabase/index";

const PROJECTS_TABLE = 'projects';

// Obtener todas las tareas de un usuario
export const getAllProjects = async (user_id) => {
  try {
    const { data, error } = await supabase
      .from(PROJECTS_TABLE)
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: true });

    if (error) throw new Error(error.message);
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// Crear nueva tarea
export const createProject = async (title, description, user_id, status = 'pending') => {
  try {
    const { data, error } = await supabase
      .from(PROJECTS_TABLE)
      .insert([{ title, description, user_id, status }])
      .select();

    if (error) throw new Error(error.message);
    return data[0]; // devolvemos solo el objeto creado
  } catch (err) {
    console.log(err);
    return null;
  }
};


// Eliminar tarea
export const deleteProject = async (id) => {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

// Actualizar tarea (por ejemplo marcar como completada)
export const updateProject = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from(PROJECTS_TABLE)
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw new Error(error.message);
    return data[0];
  } catch (err) {
    console.log(err);
    return null;
  }
};
