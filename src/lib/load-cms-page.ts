import { extractBodyContent, isEmptyCmsHtml } from '@/lib/cms-html';
import { tryGetSupabaseAdmin } from '@/lib/supabase';

export type CmsPageContent = {
  html: string;
  css: string;
};

/** Load GrapesJS HTML saved in Supabase for a page slug (e.g. home, products). */
export async function loadCmsPageBySlug(slug: string): Promise<CmsPageContent | null> {
  const supabase = tryGetSupabaseAdmin();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('pages')
      .select('gjs_html, gjs_css')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.error(`CMS page "${slug}":`, error.message);
      return null;
    }

    const gjsHtml = data?.gjs_html?.trim();
    if (!gjsHtml || isEmptyCmsHtml(gjsHtml)) return null;

    return {
      html: extractBodyContent(gjsHtml),
      css: data?.gjs_css?.trim() || '',
    };
  } catch (err) {
    console.error(`CMS page "${slug}": request failed`, err);
    return null;
  }
}
