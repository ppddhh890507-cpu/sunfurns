type ImageSlotProps = {
  label: string;
  title?: string;
  description?: string;
  aspect?: 'square' | 'video' | 'wide';
  className?: string;
};

const aspectClass = {
  square: 'aspect-square',
  video: 'aspect-[4/3]',
  wide: 'aspect-[16/9]',
};

export default function ImageSlot({
  label,
  title,
  description,
  aspect = 'video',
  className = '',
}: ImageSlotProps) {
  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md ${className}`}
    >
      <div
        className={`relative ${aspectClass[aspect]} w-full bg-neutral-100`}
        aria-label={`${label} 图片位`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
          <span className="rounded-full bg-neutral-200 px-3 py-1 text-xs font-medium text-neutral-500">
            {label}
          </span>
          <span className="text-sm text-neutral-400">点击替换图片</span>
        </div>
      </div>
      {(title || description) && (
        <div className="flex flex-1 flex-col gap-1 border-t border-neutral-100 p-4">
          {title && (
            <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
          )}
          {description && (
            <p className="text-sm leading-relaxed text-neutral-500">{description}</p>
          )}
        </div>
      )}
    </article>
  );
}
