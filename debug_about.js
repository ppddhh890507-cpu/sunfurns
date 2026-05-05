const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gclabpqbejmbvyfhzazg.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjbGFicHFiZWptYnZ5Zmh6YXpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzU1ODkzOCwiZXhwIjoyMDkzMTM0OTM4fQ.IdmTqKq3IjL51zz1phGUVFSaQ-PRoqCyHCsSrlYKHnQ';

const supabase = createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } });

async function test() {
  const pagesData = await supabase.from('pages').select('*');
  
  if (pagesData.data) {
    // Check about page
    const aboutPage = pagesData.data.find(p => p.slug === 'about');
    if (aboutPage) {
      console.log('About page gjs_html:');
      console.log(aboutPage.gjs_html);
    }
  }
}

test().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });