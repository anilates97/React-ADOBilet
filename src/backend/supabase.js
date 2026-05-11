import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase env eksik: REACT_APP_SUPABASE_URL ve REACT_APP_SUPABASE_KEY tanimli olmali."
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
