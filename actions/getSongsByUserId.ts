import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { Song } from "@/types";

const getSongsByUserId = async (): Promise<Song[]> => {
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
    .from('songs')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error.message);
  }



  return (data as any) || [];
};

export default getSongsByUserId;