
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bgjsnvugfxlevhydcywc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnanNudnVnZnhsZXZoeWRjeXdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwMzYxNjgsImV4cCI6MjA1NDYxMjE2OH0.tD9wc8LaE_6tH4Oppgox8gsoRR4OhZA_1PGFmysrv-I';

export const supabase = createClient(supabaseUrl, supabaseKey);
