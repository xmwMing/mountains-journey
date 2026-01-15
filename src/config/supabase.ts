import { createClient } from '@supabase/supabase-js';

// 使用代理URL，通过Vite代理转发请求
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:5174/api';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);
