import { getSupabaseAdmin } from '@/lib/supabase';

export const revalidate = 0;

export default async function HomePage() {
  const supabase = getSupabaseAdmin();

  // 自动从包含联系方式的页面读取联系信息
  // 优先使用 contact 页面的 div，其次选最近更新且有联系方式 div 的页面
  let contactSection = '';
  const pagesData = await supabase.from('pages').select('*');
  if (pagesData.data) {
    // 提取任意 gjs_html 中包含联系方式的 div（优先选 contact slug）
    const contactKeywordRegex = /Email|Tel|wechat|whatsapp|电话|邮件/i;
    const sorted = [...pagesData.data].sort((a, b) => {
      // contact slug 优先排最前面
      if (a.slug === 'contact') return -1;
      if (b.slug === 'contact') return 1;
      // 其余按更新时间倒序
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
    for (const page of sorted) {
      if (!page.gjs_html || !contactKeywordRegex.test(page.gjs_html)) continue;
      const bodyMatch = page.gjs_html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      const body = bodyMatch ? bodyMatch[1] : page.gjs_html;
      const divs = body.match(/<div[^>]*>[\s\S]*?<\/div>/gi) || [];
      for (let i = divs.length - 1; i >= 0; i--) {
        if (contactKeywordRegex.test(divs[i])) {
          contactSection = `<div style="background:#f5f5f5;padding:40px 20px;text-align:center;">${divs[i]}</div>`;
          break;
        }
      }
      if (contactSection) break; // 找到就停止
    }
  }

  const html = pagesData.data?.find(p => p.slug === 'home')?.gjs_html?.trim();
  const css = pagesData.data?.find(p => p.slug === 'home')?.gjs_css?.trim();

  if (html && html !== '<body></body>') {
    return (
      <div dangerouslySetInnerHTML={{
        __html: `<style>${css || ''}</style>${html}${contactSection}`
      }} />
    );
  }

  // === SUNFURNS 首页 ===
  return (
    <div>
      {/* ===== HERO 大图 ===== */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=85')",
            }}
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-44 w-full">
          <div className="max-w-2xl">
            <p className="text-[#f47321] font-semibold text-sm md:text-base uppercase tracking-widest mb-4">
              工厂直供 · 品质家具 · 全球配送
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              高端<br />家具出口
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed">
              卓越品质，工厂直供价格，从我们的工厂直达您的家门口
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/products"
                className="bg-[#f47321] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#e55f10] transition-all shadow-lg hover:shadow-xl"
              >
                浏览产品
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#152742] transition-all"
              >
                获取报价
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 关于我们 ===== */}
      <section className="bg-[#152742] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl md:text-4xl text-white/90 font-light leading-relaxed mb-10">
              "我们制造世界上最好的家具。卓越品质，工厂直供价格，
              全球配送直达您的手中。"
            </p>
            <a
              href="/about"
              className="inline-block border-2 border-white/40 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-white/10 transition-all"
            >
              了解更多 →
            </a>
          </div>
        </div>
      </section>

      {/* ===== 热门产品 ===== */}
      <section className="bg-[#0f1f33] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">热销产品</h2>
          <p className="text-white/50 text-center mb-14">探索我们的畅销家具系列</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "现代天鹅绒沙发",
                price: "¥4,299",
                image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80",
              },
              {
                name: "真皮休闲椅",
                price: "¥2,499",
                image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80",
              },
              {
                name: "简约书架",
                price: "¥1,799",
                image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&q=80",
              },
            ].map((product, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#f47321]">{product.price}</span>
                    <button className="bg-[#f47321] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#e55f10] transition-colors">
                      加入询价
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <a
              href="/products"
              className="inline-block bg-white text-[#152742] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              查看全部产品 →
            </a>
          </div>
        </div>
      </section>

      {/* ===== 产品分类 ===== */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">产品分类</h2>
          <p className="text-gray-500 text-center mb-14">为您的空间找到完美的家具</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              {
                name: "客厅家具",
                image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500&q=80",
              },
              {
                name: "卧室家具",
                image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80",
              },
              {
                name: "餐厅家具",
                image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&q=80",
              },
              {
                name: "办公家具",
                image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&q=80",
              },
            ].map((cat, i) => (
              <a
                key={i}
                href="/products"
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-base md:text-xl font-bold uppercase tracking-wider drop-shadow-lg">{cat.name}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 数据统计 ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { num: "10+", label: "年行业经验" },
              { num: "500+", label: "合作客户" },
              { num: "50+", label: "出口国家" },
              { num: "1000+", label: "产品种类" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold text-[#152742] mb-2">{stat.num}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 为什么选择我们 ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-14">为什么选择 SUNFURNS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🏭", title: "工厂直供", desc: "自有工厂生产，源头直供价格，没有中间商赚差价。" },
              { icon: "🚢", title: "全球配送", desc: "与全球领先物流合作，产品远销50多个国家和地区。" },
              { icon: "✅", title: "品质保障", desc: "精选环保材料，严格品控体系，一年质保服务。" },
            ].map((item, i) => (
              <div key={i} className="text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <span className="text-5xl mb-5 block">{item.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
