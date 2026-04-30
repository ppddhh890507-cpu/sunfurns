-- Sunfurns Database Schema for Supabase
-- Run this in Supabase Dashboard -> SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- Pages table
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT DEFAULT '',
  title_en TEXT DEFAULT '',
  content TEXT DEFAULT '',
  content_en TEXT DEFAULT '',
  gjs_html TEXT DEFAULT '',
  gjs_css TEXT DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Config table
CREATE TABLE IF NOT EXISTS config (
  key TEXT PRIMARY KEY,
  value TEXT DEFAULT ''
);

-- Insert default pages
INSERT INTO pages (slug, title, title_en) VALUES
  ('home', 'Home', 'Home'),
  ('products', 'Products', 'Products'),
  ('about', 'About Us', 'About Us'),
  ('contact', 'Contact Us', 'Contact Us'),
  ('faq', 'FAQ', 'FAQ')
ON CONFLICT (slug) DO NOTHING;

-- Enable Row Level Security (optional, for security)
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE pages ENABLE ROW LEVEL SECURITY;