import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">SUNFURNS</h3>
            <p className="text-gray-400 text-sm">
              专业沙发制造商，专注B2B家具解决方案。工厂直供价，提供OEM/ODM定制服务。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/products" className="hover:text-white">产品中心</Link></li>
              <li><Link href="/about" className="hover:text-white">关于我们</Link></li>
              <li><Link href="/faq" className="hover:text-white">常见问题</Link></li>
              <li><Link href="/contact" className="hover:text-white">联系我们</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">产品分类</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/products" className="hover:text-white">布艺沙发</Link></li>
              <li><Link href="/products" className="hover:text-white">真皮沙发</Link></li>
              <li><Link href="/products" className="hover:text-white">模块沙发</Link></li>
              <li><Link href="/products" className="hover:text-white">办公家具</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">联系我们</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>邮箱: info@sunfurns.com</li>
              <li>微信/电话: +86 138 0013 8000</li>
              <li>微信: sunfurns</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sunfurns. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  );
}