import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#152742] text-white">
      {/* 主内容区 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* 关于 SUNFURNS */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-[#f47321] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">SF</span>
              </div>
              <div>
                <span className="text-xl font-bold tracking-wide">SUNFURNS</span>
                <span className="block text-white/40 text-xs">高端家具出口</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              专注高端家具制造与出口，品质卓越、价格直供，
              产品远销全球50多个国家和地区。
            </p>
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              在线客服 7×24小时
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-4">快速链接</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-white/80 text-sm hover:text-white transition-colors">首页</Link></li>
              <li><Link href="/products" className="text-white/80 text-sm hover:text-white transition-colors">产品中心</Link></li>
              <li><Link href="/about" className="text-white/80 text-sm hover:text-white transition-colors">关于我们</Link></li>
              <li><Link href="/contact" className="text-white/80 text-sm hover:text-white transition-colors">联系我们</Link></li>
            </ul>
          </div>

          {/* 产品分类 */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-4">产品分类</h4>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-white/80 text-sm hover:text-white transition-colors">客厅家具</Link></li>
              <li><Link href="/products" className="text-white/80 text-sm hover:text-white transition-colors">卧室家具</Link></li>
              <li><Link href="/products" className="text-white/80 text-sm hover:text-white transition-colors">餐厅家具</Link></li>
              <li><Link href="/products" className="text-white/80 text-sm hover:text-white transition-colors">办公家具</Link></li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-4">联系方式</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>广东省深圳市南山区科技园 SUNFURNS 大厦</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📞</span>
                <span>+86 400-888-9999</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📱</span>
                <span>+86 138-0000-8888</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✉️</span>
                <span>info@sunfurns.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 版权条 */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} SUNFURNS. 版权所有
          </p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <Link href="/contact" className="hover:text-white/70 transition-colors">隐私政策</Link>
            <span>|</span>
            <Link href="/contact" className="hover:text-white/70 transition-colors">服务条款</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
