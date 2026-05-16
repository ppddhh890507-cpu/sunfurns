import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white text-neutral-700">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-neutral-900">SUNFURNS</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              ?? B2B ???????????? OEM/ODM ??????
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">??</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#f47321]">
                  ??
                </Link>
              </li>
              <li>
                <Link href="/products/" className="hover:text-[#f47321]">
                  ????
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="hover:text-[#f47321]">
                  ????
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">??</h4>
            <ul className="mt-4 space-y-2 text-sm text-neutral-500">
              <li>????????????</li>
              <li>+86 400-888-9999</li>
              <li>info@sunfurns.com</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-neutral-400 sm:flex-row sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} SUNFURNS</p>
          <Link href="/contact/" className="hover:text-neutral-600">
            ???????
          </Link>
        </div>
      </div>
    </footer>
  );
}
