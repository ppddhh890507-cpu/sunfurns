const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gclabpqbejmbvyfhzazg.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjbGFicHFiZWptYnZ5Zmh6YXpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzU1ODkzOCwiZXhwIjoyMDkzMTM0OTM4fQ.IdmTqKq3IjL51zz1phGUVFSaQ-PRoqCyHCsSrlYKHnQ';

const supabase = createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } });

async function test() {
  const pagesData = await supabase.from('pages').select('*');
  
  if (pagesData.data) {
    const aboutPage = pagesData.data.find(p => p.slug === 'about');
    if (aboutPage) {
      const bodyMatch = aboutPage.gjs_html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      const body = bodyMatch ? bodyMatch[1] : aboutPage.gjs_html;
      
      console.log('Body content length:', body.length);
      console.log('Body content preview (first 200):', body.substring(0, 200));
      console.log('\n--- Testing different div regexes ---');
      
      // Test 1: Simple div regex
      const simpleDivs = body.match(/<div[^>]*>[\s\S]*?<\/div>/gi) || [];
      console.log('Simple div regex - found:', simpleDivs.length);
      
      // Test 2: Non-greedy with /
      const divs2 = body.match(/<div[^>]*>[\s\S]*?<\/div>/gi) || [];
      console.log('Non-greedy div regex - found:', divs2.length);
      
      // Test 3: Check if there's any div pattern at all
      const allDivOpen = body.match(/<div/gi) || [];
      console.log('All <div> occurrences:', allDivOpen.length);
      
      // Test 4: Check for iwlgh specifically
      const iwlghIdx = body.indexOf('iwlgh');
      console.log('iwlgh found at index:', iwlghIdx);
      if (iwlghIdx !== -1) {
        console.log('Context around iwlgh:', body.substring(iwlghIdx - 20, iwlghIdx + 100));
      }
      
      // Test 5: Does the body contain the iwlgh div?
      const hasIwlgh = body.includes('iwlgh');
      console.log('Body contains iwlgh:', hasIwlgh);
      
      // Test 6: Try matching just the iwlgh div
      const iwlghMatch = body.match(/<div id="iwlgh"[^>]*>[\s\S]*?<\/div>/i);
      console.log('iwlgh specific match:', iwlghMatch ? 'FOUND - ' + iwlghMatch[0].substring(0, 80) : 'NOT FOUND');
    }
  }
}

test().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });