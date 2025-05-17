import { createClient } from '@supabase/supabase-js';

// Usar las variables de entorno definidas en el archivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };