
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bgjsnvugfxlevhydcywc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnanNudnVnZnhsZXZoeWRjeXdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwMzYxNjgsImV4cCI6MjA1NDYxMjE2OH0.tD9wc8LaE_6tH4Oppgox8gsoRR4OhZA_1PGFmysrv-I';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to initialize admin user
export const initializeAdminUser = async () => {
  try {
    // Check if admin user exists
    const { data: existingAdmin, error: queryError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', 'admin')
      .maybeSingle();
    
    if (queryError) {
      console.error('Error checking admin user:', queryError);
      return;
    }
    
    // If admin user doesn't exist, create it
    if (!existingAdmin) {
      const { data, error } = await supabase
        .from('admin_users')
        .insert([
          { 
            username: 'admin', 
            password: 'admin' 
          }
        ])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating admin user:', error);
      } else {
        console.log('Admin user created successfully');
      }
    }
  } catch (error) {
    console.error('Admin initialization error:', error);
  }
};
