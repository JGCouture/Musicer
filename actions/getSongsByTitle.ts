import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

import { Song } from '@/types';

import getSongs from './getSongs';

const getSongsByTitle = async (title: string): Promise<Song[]> => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL 
    const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY 
 
    
    const supabase = createServerComponentClient(
        { cookies: cookies}, 
        { supabaseUrl:supabaseUrl, supabaseKey:supabaseAnonKey}
       
    )
    if (!title) {
      const allSongs = await getSongs();
      return allSongs;
    }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .ilike('title', `%${title}%`)
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSongsByTitle;