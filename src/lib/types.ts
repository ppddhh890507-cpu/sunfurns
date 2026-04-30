export interface Product {
  id: string;
  name: string;
  name_en: string;
  description: string;
  description_en: string;
  price: number;
  currency: string;
  category: string;
  images: string[];
  stock: number;
  moq: number;
  material: string;
  dimensions: string;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  title_en: string;
  content: string;
  content_en: string;
  gjs_html: string;
  gjs_css: string;
  updated_at: string;
}

export interface SiteConfig {
  key: string;
  value: string;
}