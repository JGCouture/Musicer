'use client'

import {useState} from 'react'
import { Database } from "@/types_db"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { createBrowserClient } from '@supabase/ssr'





interface SupabaseProviderProps { 
  children:React.ReactNode
}

const SupabaseProvider:React.FC<SupabaseProviderProps> = ({children}) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const [supabaseClient] = useState(() =>  createBrowserClient<Database>(supabaseUrl, supabaseAnonKey))

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  )
} 

export default SupabaseProvider
