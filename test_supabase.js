const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gclabpqbejmbvyfhzazg.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjbGFicHFiZWptYnZ5Zmh6YXpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzU1ODkzOCwiZXhwIjoyMDkzMTM0OTM4fQ.IdmTqKq3IjL51zz1phGUVFSaQ-PRoqCyHCsSrlYKHnQ';

const supabase = createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } });

async function test() {
  console.log('Testing Supabase admin client...');
  
  const pagesData = await supabase.from('pages').select('*');
  console.log('Error:', pagesData.error);
  console.log('Data count:', pagesData.data ? pagesData.data.length : 0);
  
  if (pagesData.data) {
    const contactPages = pagesData.data
      .filter(p => p.gjs_html && /Email|Tel|wechat|whatsapp|电话|邮件/i.test(p.gjs_html))
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    console.log('Contact pages found:', contactPages.length);
    if (contactPages[0]) {
      console.log('Latest contact page:', contactPages[0].slug, '- updated:', contactPages[0].updated_at);
      const bodyMatch = contactPages[0].gjs_html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      const body = bodyMatch ? bodyMatch[1] : contactPages[0].gjs_html;
      const divs = body.match(/<div[^>]*>[\s\S]*?<\/div>/gi) || [];
      console.log('Total divs in body:', divs.length);
      for (let i = divs.length - 1; i >= 0; i--) {
        if (/Email|Tel|wechat|whatsapp|电话|邮件/i.test(divs[i])) {
          console.log('Contact div found at index', i, ':', divs[i].substring(0, 100));
          const contactSection = `<div style="background:#f5f5f5;padding:40px 20px;text-align:center;">${divs[i]}</div>`;
          console.log('contactSection created, length:', contactSection.length);
          console.log('contactSection preview:', contactSection.substring(0, 100));
          break;
        }
      }
    }
    
    // Test home page retrieval
    const homePage = pagesData.data.find(p => p.slug === 'home');
    console.log('\nHome page found:', !!homePage);
    if (homePage) {
      console.log('Home gjs_html length:', homePage.gjs_html ? homePage.gjs_html.length : 0);
      console.log('Home gjs_css length:', homePage.gjs_css ? homePage.gjs_css.length : 0);
    }
  }
}

test().then(() => console.log('\nDone')).catch(e => console.error('Error:', e));