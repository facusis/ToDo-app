import { supabase } from "@/api/supabase/index"; // Importar la conexión a Supabase

// Función para crear un nuevo usuario (registro)
export const createUser = async (email, password, name) => {
  try {
    // Primero, registrar al usuario en Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    // Si hubo un error al crear el usuario, mostramos el mensaje de error
    if (error) {
      console.error('Error al crear usuario en Supabase Auth:', error.message);
      return { success: false, message: error.message }; // Retornar un mensaje de error si ocurre
    }
    console.log(data)

    // Si todo es exitoso, devolvemos los datos del usuario
    return { success: true, message: 'Usuario registrado correctamente', user: data.user };
  } catch (err) {
    console.error('Error:', err);
    return { success: false, message: 'Hubo un problema al crear el usuario.' }; // Error genérico
  }
};
