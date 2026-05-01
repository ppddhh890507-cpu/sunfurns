import { NextResponse } from 'next/server';

const HOME_PAGE_HTML = `<body>
  <section style="background:linear-gradient(to right, #1e3a8a, #1e40af);color:white;padding:80px 20px;text-align:center;">
    <h1 style="font-size:48px;font-weight:bold;margin:0 0 24px;">专业沙发制造商</h1>
    <p style="font-size:20px;color:#bfdbfe;margin:0 0 32px;max-width:800px;margin-left:auto;margin-right:auto;">
      源头工厂直供价，提供OEM/ODM定制服务。您的优质家具B2B合作伙伴。
    </p>
    <div style="display:flex;justify-content:center;gap:16px;">
      <a href="/contact" style="background:white;color:#1e3a8a;padding:12px 24px;border-radius:8px;font-weight:600;text-decoration:none;">获取报价</a>
      <a href="/products" style="border:2px solid white;color:white;padding:12px 24px;border-radius:8px;font-weight:600;text-decoration:none;">浏览产品</a>
    </div>
  </section>

  <section style="padding:64px 20px;background:white;">
    <h2 style="text-align:center;font-size:28px;font-weight:bold;margin:0 0 48px;color:#1e3a8a;">为什么选择我们</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:32px;max-width:1200px;margin:0 auto;">
      <div style="text-align:center;padding:24px;">
        <div style="font-size:48px;margin-bottom:16px;">🏭</div>
        <h3 style="font-size:20px;font-weight:600;margin:0 0 8px;">工厂直供</h3>
        <p style="color:#6b7280;margin:0;">无中间商，价格有竞争力</p>
      </div>
      <div style="text-align:center;padding:24px;">
        <div style="font-size:48px;margin-bottom:16px;">🎨</div>
        <h3 style="font-size:20px;font-weight:600;margin:0 0 8px;">OEM/ODM定制</h3>
        <p style="color:#6b7280;margin:0;">按需定制，满足您的规格要求</p>
      </div>
      <div style="text-align:center;padding:24px;">
        <div style="font-size:48px;margin-bottom:16px;">📦</div>
        <h3 style="font-size:20px;font-weight:600;margin:0 0 8px;">起订量：10套</h3>
        <p style="color:#6b7280;margin:0;">灵活订单量，适合各类企业</p>
      </div>
      <div style="text-align:center;padding:24px;">
        <div style="font-size:48px;margin-bottom:16px;">🚢</div>
        <h3 style="font-size:20px;font-weight:600;margin:0 0 8px;">全球发货</h3>
        <p style="color:#6b7280;margin:0;">可靠配送，抵达世界各地</p>
      </div>
    </div>
  </section>

  <section style="padding:64px 20px;background:#f9fafb;">
    <h2 style="text-align:center;font-size:28px;font-weight:bold;margin:0 0 48px;color:#1e3a8a;">我们的产品</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:32px;max-width:1200px;margin:0 auto;">
      <div style="background:white;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
        <div style="background:#e5e7eb;border:2px dashed #9ca3af;height:192px;border-radius:8px 8px 0 0;"></div>
        <div style="padding:24px;">
          <h3 style="font-size:20px;font-weight:600;margin:0 0 8px;">布艺沙发</h3>
          <p style="color:#6b7280;margin:0 0 16px;">舒适耐用的布艺沙发，适用于客厅</p>
          <a href="/products" style="color:#1e3a8a;font-weight:600;text-decoration:none;">查看更多 →</a>
        </div>
      </div>
      <div style="background:white;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
        <div style="background:#e5e7eb;border:2px dashed #9ca3af;height:192px;border-radius:8px 8px 0 0;"></div>
        <div style="padding:24px;">
          <h3 style="font-size:20px;font-weight:600;margin:0 0 8px;">真皮沙发</h3>
          <p style="color:#6b7280;margin:0 0 16px;">现代设计的高品质真皮沙发</p>
          <a href="/products" style="color:#1e3a8a;font-weight:600;text-decoration:none;">查看更多 →</a>
        </div>
      </div>
      <div style="background:white;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
        <div style="background:#e5e7eb;border:2px dashed #9ca3af;height:192px;border-radius:8px 8px 0 0;"></div>
        <div style="padding:24px;">
          <h3 style="font-size:20px;font-weight:600;margin:0 0 8px;">模块沙发</h3>
          <p style="color:#6b7280;margin:0 0 16px;">可定制的模块化沙发，适应任何空间</p>
          <a href="/products" style="color:#1e3a8a;font-weight:600;text-decoration:none;">查看更多 →</a>
        </div>
      </div>
    </div>
  </section>

  <section style="background:#1e3a8a;color:white;padding:64px 20px;text-align:center;">
    <h2 style="font-size:30px;font-weight:bold;margin:0 0 16px;">准备好开始订购了吗？</h2>
    <p style="color:#93c5fd;margin:0 0 32px;max-width:600px;margin-left:auto;margin-right:auto;">
      立即联系我们，免费咨询和报价。我们将在24小时内回复。
    </p>
    <a href="/contact" style="background:white;color:#1e3a8a;padding:12px 32px;border-radius:8px;font-weight:600;text-decoration:none;">立即联系</a>
  </section>
</body>`;

const HOME_PAGE_CSS = `* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
section { min-width: 0; }
`;

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/pages?slug=eq.home`,
      {
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY || '',
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY || ''}`,
        },
      }
    );
    const data = await response.json();
    if (data && data.length > 0) {
      return NextResponse.json({ success: true, data: data[0] });
    }
    return NextResponse.json({ success: false, error: 'home page not found' });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) });
  }
}

export async function PUT(request: Request) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/pages?slug=eq.home`,
      {
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY || '',
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY || ''}`,
          'Prefer': 'return=representation',
        },
      }
    );
    const existing = await res.json();

    const pageId = existing?.[0]?.id;
    if (!pageId) {
      return NextResponse.json({ success: false, error: 'home page not found in DB' });
    }

    const updateRes = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/pages?id=eq.${pageId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY || '',
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY || ''}`,
        },
        body: JSON.stringify({
          gjs_html: HOME_PAGE_HTML,
          gjs_css: HOME_PAGE_CSS,
          title: '首页',
        }),
      }
    );

    const result = await updateRes.json();
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) });
  }
}