'use client';

import Link from 'next/link';
import { useState } from 'react';

const nav = [
  { href: '/', label: '首页' },
  { href: '/products/', label: '产品中心' },
];

const quoteHref = 'mailto:info@sunfurns.com?subject=SUNFURNS%20%E8%AF%A2%E4%BB%B7';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="hidden border-b border-neutral-100 bg-neutral-50 text-xs text-neutral-600 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <span>深圳 · 工厂直供 · 全球配送</span>
          <span className="flex gap-4">
            <span>400-888-9999</span>
            <span>info@sunfurns.com</span>
            <span>周一至周六 9:00–18:00</span>
          </span>
        </div>
      </div>

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-[4.5rem]">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded bg-neutral-900 text-sm font-bold text-white">
              SF
            </span>
            <span className="text-lg font-bold tracking-tight text-neutral-900">SUNFURNS</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={quoteHref}
              className="ml-2 rounded-md bg-[#f47321] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#e55f10]"
            >
              获取报价
            </a>
          </div>

          <button
            type="button"
            className="rounded-md p-2 text-neutral-700 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="菜单"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div className="border-t border-neutral-100 pb-4 md:hidden">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={quoteHref}
              className="mt-2 block rounded-md bg-[#f47321] px-3 py-2.5 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              获取报价
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
