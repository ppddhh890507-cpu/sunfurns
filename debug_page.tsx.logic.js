const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gclabpqbejmbvyfhzazg.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjbGFicHFiZWptYnZ5Zmh6YXpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzU1ODkzOCwiZXhwIjoyMDkzMTM0OTM4fQ.IdmTqKq3IjL51zz1phGUVFSaQ-PRoqCyHCsSrlYKHnQ';

const supabase = createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } });

async function test() {
  const pagesData = await supabase.from('pages').select('*');
  
  if (pagesData.data) {
    const contactPages = pagesData.data
      .filter(p => p.gjs_html && /Email|Tel|wechat|whatsapp|电话|邮件/i.test(p.gjs_html))
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    
    console.log('Contact pages found:', contactPages.length);
    console.log('Order:', contactPages.map(p => p.slug));
    
    if (contactPages.length > 0) {
      const latest = contactPages[0];
      console.log('\nLatest contact page:', latest.slug);
      
      const bodyMatch = latest.gjs_html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      const body = bodyMatch ? bodyMatch[1] : latest.gjs_html;
      
      const divs = body.match(/<div[^>]*>[\s\S]*?<\/div>/gi) || [];
      console.log('Total divs found:', divs.length);
      
      console.log('\nChecking each div for contact keywords:');
      for (let i = divs.length - 1; i >= 0; i--) {
        const hasContact = /Email|Tel|wechat|whatsapp|电话|邮件/i.test(divs[i]);
        console.log(`[${i}] length=${divs[i].length} hasContact=${hasContact} preview=${divs[i].substring(0, 60)}`);
      }
      
      console.log('\n--- Now running the actual page.tsx logic ---');
      let contactSection = '';
      for (let i = divs.length - 1; i >= 0; i--) {
        if (/Email|Tel|wechat|whatsapp|电话|邮件/i.test(divs[i])) {
          contactSection = `<div style="background:#f5f5f5;padding:40px 20px;text-align:center;">${divs[i]}</div>`;
          console.log('contactSection created from div index', i);
          console.log('contactSection preview:', contactSection.substring(0, 100));
          break;
        }
      }
      console.log('Final contactSection length:', contactSection.length);
      console.log('Final contactSection is empty:', contactSection === '');
    }
  }
}

test().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });