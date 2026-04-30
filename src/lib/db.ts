import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gclabpqbejmbvyfhzazg.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.warn('SUPABASE_SERVICE_ROLE_KEY not set, using anon key for read operations');
}

// Admin client with service role key for privileged operations
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } })
  : null;

// Public client for browser/frontend (uses RLS policies)
export const supabase = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjbGFicGFiZWptbXZ5Zmh6YXpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MTk3MDAsImV4cCI6MjA2Mjk5NTcwMH0.placeholder', { auth: { persistSession: false } });

// Initialize database tables
export async function initDatabase() {
  if (!supabaseAdmin) {
    console.error('Cannot init DB: SUPABASE_SERVICE_ROLE_KEY not set');
    return;
  }

  // Create products table
  const { error: productsError } = await supabaseAdmin.rpc('exec', {
    query: `
      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL DEFAULT '',
        name_en TEXT DEFAULT '',
        description TEXT DEFAULT '',
        description_en TEXT DEFAULT '',
        price REAL DEFAULT 0,
        currency TEXT DEFAULT 'USD',
        category TEXT DEFAULT '',
        images JSONB DEFAULT '[]'::jsonb,
        stock INTEGER DEFAULT 0,
        moq INTEGER DEFAULT 1,
        material TEXT DEFAULT '',
        dimensions TEXT DEFAULT '',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
  });
  if (productsError) console.log('Products table init:', productsError.message);

  // Create pages table  
  const { error: pagesError } = await supabaseAdmin.rpc('exec', {
    query: `
      CREATE TABLE IF NOT EXISTS pages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug TEXT UNIQUE NOT NULL,
        title TEXT DEFAULT '',
        title_en TEXT DEFAULT '',
        content TEXT DEFAULT '',
        content_en TEXT DEFAULT '',
        gjs_html TEXT DEFAULT '',
        gjs_css TEXT DEFAULT '',
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
  });
  if (pagesError) console.log('Pages table init:', pagesError.message);

  // Initialize default pages
  const defaultPages = [
    { slug: 'home', title: 'Home', title_en: 'Home' },
    { slug: 'products', title: 'Products', title_en: 'Products' },
    { slug: 'about', title: 'About Us', title_en: 'About Us' },
    { slug: 'contact', title: 'Contact Us', title_en: 'Contact Us' },
    { slug: 'faq', title: 'FAQ', title_en: 'FAQ' },
  ];

  for (const page of defaultPages) {
    await supabaseAdmin.from('pages').upsert(page, { onConflict: 'slug' });
  }
}

// Helper to get the admin client
export function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY not configured');
  }
  return supabaseAdmin;
}