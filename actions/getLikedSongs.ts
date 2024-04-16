import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import { Song } from "@/types";
import { Database } from "@/types_db";

const getLikedSongs = async (): Promise<Song[]> => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL 
  const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY 
  const cookieStore = cookies()
  
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        },
      },   
  )
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('liked_songs')
    .select('* , songs(*)')
    .eq("user_id", user?.id)
    .order('created_at', { ascending: false })

  if (error) {
    return  [];
  }

  if(!data){
    return [];
  }

  return data.map((item) => ({
    ...item.songs
  }))
};

export default getLikedSongs;