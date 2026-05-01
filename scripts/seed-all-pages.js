const PAGES = [
  {
    slug: 'about',
    titleEn: '关于我们',
    gjs_html: `<body>
<section style="padding:80px 20px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;text-align:center">
  <h1 style="font-size:48px;font-weight:bold;margin:0 0 16px">关于 Sunfurns</h1>
  <p style="font-size:20px;color:#ddd;margin:0">您的专业家具制造合作伙伴</p>
</section>
<section style="padding:64px 20px;max-width:1200px;margin:0 auto">
  <h2 style="font-size:32px;font-weight:bold;text-align:center;margin:0 0 48px;color:#1e3a8a">我们的优势</h2>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:32px">
    <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 4px 6px rgba(0,0,0,0.1)">
      <div style="font-size:48px;margin-bottom:16px">🏭</div>
      <h3 style="font-size:20px;font-weight:600;margin:0 0 12px">源头工厂</h3>
      <p style="color:#6b7280;margin:0">10年+制造经验，10,000+平方米厂房</p>
    </div>
    <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 4px 6px rgba(0,0,0,0.1)">
      <div style="font-size:48px;margin-bottom:16px">🌍</div>
      <h3 style="font-size:20px;font-weight:600;margin:0 0 12px">出口全球</h3>
      <p style="color:#6b7280;margin:0">50+国家客户，品质获国际认可</p>
    </div>
    <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 4px 6px rgba(0,0,0,0.1)">
      <div style="font-size:48px;margin-bottom:16px">🎯</div>
      <h3 style="font-size:20px;font-weight:600;margin:0 0 12px">OEM/ODM定制</h3>
      <p style="color:#6b7280;margin:0">按需定制，满足您的品牌要求</p>
    </div>
    <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 4px 6px rgba(0,0,0,0.1)">
      <div style="font-size:48px;margin-bottom:16px">💰</div>
      <h3 style="font-size:20px;font-weight:600;margin:0 0 12px">价格优势</h3>
      <p style="color:#6b7280;margin:0">工厂直供，无中间商差价</p>
    </div>
  </div>
</section>
<section style="padding:64px 20px;background:#f9fafb">
  <div style="max-width:800px;margin:0 auto;text-align:center">
    <h2 style="font-size:32px;font-weight:bold;margin:0 0 24px">联系我们</h2>
    <p style="color:#6b7280;font-size:18px;margin:0 0 32px">期待与您合作，打造优质家具产品</p>
    <a href="/contact" style="display:inline-block;background:#1e3a8a;color:white;padding:16px 48px;border-radius:8px;font-weight:600;text-decoration:none;font-size:18px">立即联系</a>
  </div>
</section>
</body>`,
    gjs_css: `* { box-sizing: border-box; } body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }`
  },
  {
    slug: 'products',
    titleEn: '产品中心',
    gjs_html: `<body>
<section style="padding:80px 20px;background:#1e3a8a;color:white;text-align:center">
  <h1 style="font-size:48px;font-weight:bold;margin:0 0 16px">产品中心</h1>
  <p style="font-size:20px;color:#93c5fd;margin:0">专业沙发制造商，提供多种家具系列</p>
</section>
<section style="padding:64px 20px;max-width:1200px;margin:0 auto">
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:32px">
    <div style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1)">
      <div style="background:#e5e7eb;height:200px;border:2px dashed #9ca3af"></div>
      <div style="padding:24px">
        <h3 style="font-size:22px;font-weight:600;margin:0 0 8px;color:#1e3a8a">布艺沙发</h3>
        <p style="color:#6b7280;margin:0 0 16px">舒适耐用的布艺沙发，适用于客厅</p>
        <a href="/contact" style="color:#1e3a8a;font-weight:600;text-decoration:none">询价 →</a>
      </div>
    </div>
    <div style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1)">
      <div style="background:#e5e7eb;height:200px;border:2px dashed #9ca3af"></div>
      <div style="padding:24px">
        <h3 style="font-size:22px;font-weight:600;margin:0 0 8px;color:#1e3a8a">真皮沙发</h3>
        <p style="color:#6b7280;margin:0 0 16px">现代设计的高品质真皮沙发</p>
        <a href="/contact" style="color:#1e3a8a;font-weight:600;text-decoration:none">询价 →</a>
      </div>
    </div>
    <div style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1)">
      <div style="background:#e5e7eb;height:200px;border:2px dashed #9ca3af"></div>
      <div style="padding:24px">
        <h3 style="font-size:22px;font-weight:600;margin:0 0 8px;color:#1e3a8a">模块沙发</h3>
        <p style="color:#6b7280;margin:0 0 16px">可定制的模块化沙发，适应任何空间</p>
        <a href="/contact" style="color:#1e3a8a;font-weight:600;text-decoration:none">询价 →</a>
      </div>
    </div>
  </div>
</section>
<section style="padding:64px 20px;background:#f9fafb;text-align:center">
  <h2 style="font-size:28px;font-weight:bold;margin:0 0 24px">需要定制产品吗？</h2>
  <p style="color:#6b7280;margin:0 0 32px">我们提供OEM/ODM服务，发送您的规格要求，获取定制报价。</p>
  <a href="/contact" style="display:inline-block;background:#1e3a8a;color:white;padding:14px 40px;border-radius:8px;font-weight:600;text-decoration:none">获取定制报价</a>
</section>
</body>`,
    gjs_css: `* { box-sizing: border-box; } body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }`
  },
  {
    slug: 'faq',
    titleEn: '常见问题',
    gjs_html: `<body>
<section style="padding:80px 20px;background:#1e3a8a;color:white;text-align:center">
  <h1 style="font-size:48px;font-weight:bold;margin:0 0 16px">常见问题</h1>
  <p style="font-size:20px;color:#93c5fd;margin:0">关于我们的产品和服务</p>
</section>
<section style="padding:64px 20px;max-width:800px;margin:0 auto">
  <div style="display:flex;flex-direction:column;gap:20px">
    <div style="background:white;border-radius:12px;padding:24px;box-shadow:0 2px 4px rgba(0,0,0,0.1)">
      <h3 style="font-size:18px;font-weight:600;margin:0 0 8px;color:#1e3a8a">最小起订量是多少？</h3>
      <p style="color:#6b7280;margin:0">我们的起订量是每款10套。对于定制OEM/ODM订单，起订量可能因规格而异。</p>
    </div>
    <div style="background:white;border-radius:12px;padding:24px;box-shadow:0 2px 4px rgba(0,0,0,0.1)">
      <h3 style="font-size:18px;font-weight:600;margin:0 0 8px;color:#1e3a8a">你们接受哪些付款方式？</h3>
      <p style="color:#6b7280;margin:0">我们接受T/T（30%定金，70%尾款发货前付清）、L/C即期，以及PayPal（小额订单）。</p>
    </div>
    <div style="background:white;border-radius:12px;padding:24px;box-shadow:0 2px 4px rgba(0,0,0,0.1)">
      <h3 style="font-size:18px;font-weight:600;margin:0 0 8px;color:#1e3a8a">生产交货期是多长？</h3>
      <p style="color:#6b7280;margin:0">标准订单：收到定金后15-25天。定制/OEM订单：25-35天，视复杂程度而定。</p>
    </div>
    <div style="background:white;border-radius:12px;padding:24px;box-shadow:0 2px 4px rgba(0,0,0,0.1)">
      <h3 style="font-size:18px;font-weight:600;margin:0 0 8px;color:#1e3a8a">你们提供OEM/ODM服务吗？</h3>
      <p style="color:#6b7280;margin:0">是的，我们有丰富的OEM/ODM经验。我们可以按照您的设计、规格和品牌要求生产。</p>
    </div>
    <div style="background:white;border-radius:12px;padding:24px;box-shadow:0 2px 4px rgba(0,0,0,0.1)">
      <h3 style="font-size:18px;font-weight:600;margin:0 0 8px;color:#1e3a8a">有哪些运输方式？</h3>
      <p style="color:#6b7280;margin:0">我们提供FOB、CIF、DDU和DDP。我们与可靠货运代理合作，确保安全及时交付。</p>
    </div>
    <div style="background:white;border-radius:12px;padding:24px;box-shadow:0 2px 4px rgba(0,0,0,0.1)">
      <h3 style="font-size:18px;font-weight:600;margin:0 0 8px;color:#1e3a8a">你们提供什么保修？</h3>
      <p style="color:#6b7280;margin:0">我们为所有产品提供1年保修。保修涵盖正常使用下的制造缺陷。</p>
    </div>
  </div>
</section>
<section style="padding:48px 20px;background:#f9fafb;text-align:center">
  <p style="color:#6b7280;margin:0 0 24px">还有问题吗？请直接联系我们。</p>
  <a href="/contact" style="display:inline-block;background:#1e3a8a;color:white;padding:14px 40px;border-radius:8px;font-weight:600;text-decoration:none">联系我们</a>
</section>
</body>`,
    gjs_css: `* { box-sizing: border-box; } body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }`
  }
];

const PAGE_IDS = {
  about: 'a6340da0-b3eb-4ff7-95e5-ca7504389fc6',
  products: 'dc9866f5-4318-4e93-a2ee-760f220312fa',
  faq: 'dede0d87-f17a-4f0e-86a4-cdcb7340bff5'
};

async function seedPage(slug, pageId, data) {
  const res = await fetch(`https://www.sunfurns.com/api/pages/${pageId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gjsHtml: data.gjs_html, gjsCss: data.gjs_css, titleEn: data.titleEn })
  });
  const result = await res.json();
  console.log(`${slug}: ${result.success ? 'OK' : 'FAILED - ' + JSON.stringify(result)}`);
  return result;
}

async function main() {
  console.log('Seeding pages...');
  for (const page of PAGES) {
    const pageId = PAGE_IDS[page.slug];
    if (pageId) {
      await seedPage(page.slug, pageId, page);
    }
  }
  console.log('Done!');
}

main().catch(console.error);