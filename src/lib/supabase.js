import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vlhjsfkwvsiqbhrbhudk.supabase.co'
const supabaseKey = 'sb_publishable_NLXuVKH_Lf1zyN0evLGvLg_6LtRgTMd'

export const supabase = createClient(supabaseUrl, supabaseKey)
