
import { supabase } from "@/api/supabase/index"; 

const TABLE_NAME = 'projects'

// Read all projects
export const getAllProjects = async () => {
  try {
    // Hacemos peticion
    const { data, error } = await supabase
      .from('TABLE_NAME')
      .insert({ title, descrption })
      .select()

    // Comprobamos error
    if(error) {
      throw new Error(error.message)
    }

    // Procesamos datos


    // Devolvemos datos
    return data

  } catch(err) {
    console.log(err)
    return []
  }
}

export const createProject = async (title, descrption) => {
  
}