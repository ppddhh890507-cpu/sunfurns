"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#152742] sticky top-0 z-50">
      {/* 顶部信息条 - 只留联系方式 */}
      <div className="hidden md:block bg-[#0f1f33] text-xs text-white/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-9">
          <div className="flex items-center gap-4">
            <span>🌐 深圳 · 工厂直供 · 全球配送</span>
            <span className="text-white/20">|</span>
            <span>📞 400-888-9999</span>
            <span className="text-white/20">|</span>
            <span>✉️ info@sunfurns.com</span>
          </div>
          <div className="flex items-center gap-4">
            <span>🕐 周一至周六 9:00-18:00</span>
          </div>
        </div>
      </div>

      {/* 主导航 */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-[#f47321] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm tracking-wide">SF</span>
            </div>
            <div>
              <span className="text-white font-bold text-xl tracking-wide">SUNFURNS</span>
              <span className="hidden md:block text-white/40 text-xs ml-2">高端家具出口</span>
            </div>
          </Link>

          {/* 桌面端导航 */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 text-sm font-medium text-white hover:text-[#f47321] transition-colors">
              首页
            </Link>
            <Link href="/products" className="px-4 py-2 text-sm font-medium text-white/80 hover:text-[#f47321] transition-colors">
              产品中心
            </Link>
            <Link href="/about" className="px-4 py-2 text-sm font-medium text-white/80 hover:text-[#f47321] transition-colors">
              关于我们
            </Link>
            <Link href="/contact" className="px-4 py-2 text-sm font-medium text-white/80 hover:text-[#f47321] transition-colors">
              联系我们
            </Link>
          </div>

          {/* 右侧按钮 */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/contact"
              className="bg-[#f47321] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#e55f10] transition-colors shadow-md hover:shadow-lg"
            >
              获取报价
            </a>
          </div>

          {/* 移动端菜单按钮 */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-[#f47321] p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 bg-[#0f1f33]">
            <div className="flex flex-col space-y-1">
              <Link href="/" className="px-4 py-3 text-sm font-medium text-white bg-white/10 rounded-lg">首页</Link>
              <Link href="/products" className="px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10 rounded-lg">产品中心</Link>
              <Link href="/about" className="px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10 rounded-lg">关于我们</Link>
              <Link href="/contact" className="px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10 rounded-lg">联系我们</Link>
              <div className="pt-2">
                <Link href="/contact" className="block text-center bg-[#f47321] text-white px-4 py-3 rounded-lg font-semibold text-sm">获取报价</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}