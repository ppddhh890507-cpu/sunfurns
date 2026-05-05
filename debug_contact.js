const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gclabpqbejmbvyfhzazg.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjbGFicHFiZWptYnZ5Zmh6YXpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzU1ODkzOCwiZXhwIjoyMDkzMTM0OTM4fQ.IdmTqKq3IjL51zz1phGUVFSaQ-PRoqCyHCsSrlYKHnQ';

const supabase = createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } });

async function test() {
  const pagesData = await supabase.from('pages').select('*');
  
  if (pagesData.data) {
    // Check each page's gjs_html for body tag
    pagesData.data.forEach(p => {
      const hasBody = /<body[^>]*>/i.test(p.gjs_html);
      const hasDivs = /<div[^>]*>/i.test(p.gjs_html);
      console.log(p.slug, '- hasBody:', hasBody, '- hasDivs:', hasDivs, '- gjs_html len:', p.gjs_html.length);
    });
    
    // Check contact page specifically
    const contactPage = pagesData.data.find(p => p.slug === 'contact');
    if (contactPage) {
      console.log('\nContact page gjs_html:');
      console.log(contactPage.gjs_html.substring(0, 500));
    }
  }
}

test().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });