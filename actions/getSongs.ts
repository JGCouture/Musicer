import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { createClient } from '@supabase/supabase-js'

import { Song } from "@/types";
import { Database } from "@/types_db";

const getSongs = async (): Promise<Song[]> => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL 
    const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY 
 
    
    const supabase = createServerComponentClient(
        { cookies: cookies}, 
        { supabaseUrl:supabaseUrl, supabaseKey:supabaseAnonKey}
       
)

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSongs;