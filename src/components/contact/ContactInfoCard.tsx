type ContactInfoCardProps = {
  compact?: boolean;
  className?: string;
};

const items = [
  { icon: '📍', label: '地址', value: '广东省深圳市南山区科技园 SUNFURNS 大厦' },
  { icon: '📞', label: '电话', value: '400-888-9999', href: 'tel:400-888-9999' },
  { icon: '📱', label: '手机', value: '+86 138-0000-8888', href: 'tel:+8613800008888' },
  { icon: '✉️', label: '邮箱', value: 'info@sunfurns.com', href: 'mailto:info@sunfurns.com' },
  { icon: '🕐', label: '工作时间', value: '周一至周六 9:00-18:00（北京时间）' },
];

export default function ContactInfoCard({ compact = false, className = '' }: ContactInfoCardProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
        <h2 className={`font-semibold text-neutral-900 ${compact ? 'text-lg' : 'text-2xl'} mb-4`}>
          联系方式
        </h2>
        <ul className="space-y-3.5">
          {items.map((item) => (
            <li key={item.label} className="flex items-start gap-3">
              <span className="text-xl leading-none" aria-hidden>
                {item.icon}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-0.5 block text-sm text-neutral-800 hover:text-[#f47321]"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-0.5 text-sm text-neutral-700">{item.value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg bg-neutral-900 p-5 sm:p-6 text-white">
        <h3 className={`font-semibold ${compact ? 'text-base' : 'text-xl'}`}>快速回复</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-300">
          我们通常会在 24 小时内回复询价。紧急事项请致电或发送邮件。
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="tel:400-888-9999"
            className="inline-flex rounded-md bg-[#f47321] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#e55f10]"
          >
            拨打热线
          </a>
          <a
            href="mailto:info@sunfurns.com"
            className="inline-flex rounded-md border border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            发送邮件
          </a>
        </div>
      </div>
    </div>
  );
}
