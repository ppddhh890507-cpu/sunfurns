import { extractBodyContent, isEmptyCmsHtml } from '@/lib/cms-html';
import { tryGetSupabaseAdmin } from '@/lib/supabase';

export const revalidate = 0;

export default async function ContactPage() {
  const supabase = tryGetSupabaseAdmin();
  let contactPage: { gjs_html?: string | null; gjs_css?: string | null } | undefined;

  if (supabase) {
    try {
      const { data, error } = await supabase.from('pages').select('*');
      if (!error && data) {
        contactPage = data.find((p) => p.slug === 'contact');
      }
    } catch (err) {
      console.error('Contact page: Supabase request failed', err);
    }
  }

  const gjsHtml = contactPage?.gjs_html?.trim();
  const gjsCss = contactPage?.gjs_css?.trim();

  if (gjsHtml && !isEmptyCmsHtml(gjsHtml)) {
    const bodyContent = extractBodyContent(gjsHtml);
    return (
      <div
        className="py-16"
        dangerouslySetInnerHTML={{
          __html: `<style>${gjsCss || ''}</style>${bodyContent}`
        }}
      />
    );
  }

  // === 无数据库内容时使用静态联系表单（回退） ===
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-4">联系我们</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          如有询价、报价或合作机会，请与我们联系。我们通常会在24小时内回复。
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 联系表单 */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">发送消息</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">姓名 *</label>
                  <input type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="您的姓名" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">邮箱 *</label>
                  <input type="email" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="your@email.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">公司</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="您的公司" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">电话/微信</label>
                  <input type="tel" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="+86 138 xxxx xxxx" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">感兴趣的产品</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">选择产品类别</option>
                  <option value="fabric-sofa">布艺沙发</option>
                  <option value="leather-sofa">真皮沙发</option>
                  <option value="modular-sofa">模块沙发</option>
                  <option value="office-furniture">办公家具</option>
                  <option value="custom">定制OEM/ODM</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">留言 *</label>
                <textarea required rows={4} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="请告诉我们您的需求..." />
              </div>
              <button type="submit" className="w-full bg-[#152742] text-white py-3 rounded-lg font-semibold hover:bg-[#0f1f33] transition-colors">
                发送询价
              </button>
            </form>
          </div>

          {/* 联系信息 */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-2xl font-semibold mb-6">联系方式</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <h3 className="font-medium text-gray-800">地址</h3>
                    <p className="text-gray-600">广东省深圳市南山区科技园 SUNFURNS 大厦</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <h3 className="font-medium text-gray-800">电话</h3>
                    <p className="text-gray-600">400-888-9999</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <h3 className="font-medium text-gray-800">手机</h3>
                    <p className="text-gray-600">+86 138-0000-8888</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <h3 className="font-medium text-gray-800">邮箱</h3>
                    <p className="text-gray-600">info@sunfurns.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🕐</span>
                  <div>
                    <h3 className="font-medium text-gray-800">工作时间</h3>
                    <p className="text-gray-600">周一至周六 9:00-18:00 (北京时间)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#152742] rounded-lg shadow-md p-8 text-white">
              <h2 className="text-xl font-semibold mb-4">快速回复</h2>
              <p className="text-white/80 mb-4">
                我们通常会在24小时内回复所有询价。如有紧急事项，请通过电话或微信联系我们。
              </p>
              <div className="flex gap-4">
                <a href="tel:400-888-9999" className="bg-[#f47321] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#e55f10] transition-colors">
                  拨打热线
                </a>
                <a href="mailto:info@sunfurns.com" className="border-2 border-white text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  发送邮件
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}