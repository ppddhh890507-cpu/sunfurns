'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin', label: '控制台', icon: '📊' },
  { href: '/admin/products', label: '产品管理', icon: '📦' },
  { href: '/admin/pages', label: '页面管理', icon: '📄' },
  { href: '/admin/editor', label: '可视化编辑器', icon: '🎨' },
  { href: '/admin/settings', label: '设置', icon: '⚙️' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 侧边栏 */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold">🏭 Sunfurns 管理后台</h1>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === item.href 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <span>←</span>
            <span>返回前台</span>
          </Link>
        </div>
      </aside>

      {/* 主内容 */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}