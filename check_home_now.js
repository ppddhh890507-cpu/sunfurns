const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://gclabpqbejmbvyfhzazg.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjbGFicHFiZWptYnZ5Zmh6YXpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzU1ODkzOCwiZXhwIjoyMDkzMTM0OTM4fQ.IdmTqKq3IjL51zz1phGUVFSaQ-PRoqCyHCsSrlYKHnQ';
const supabase = createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } });
async function test() {
  const r = await supabase.from('pages').select('*');
  if (r.data) {
    const home = r.data.find(p => p.slug === 'home');
    console.log('home gjs_html:', home ? home.gjs_html.substring(0, 200) : 'NOT FOUND');
    console.log('home gjs_html === empty?', home ? (home.gjs_html === '' || home.gjs_html === '<body></body>') : 'N/A');
    console.log('home gjs_html length:', home ? home.gjs_html.length : 0);
  }
}
test().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });