import ImageSlot from '@/components/ui/ImageSlot';
import Link from 'next/link';

const productCatalog = Array.from({ length: 12 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return {
    label: `??? ${n}`,
    title: '????',
    description: '??????????MOQ???????????',
  };
});

export default function ProductsPageContent() {
  return (
    <div className="bg-neutral-50">
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">????</h1>
          <p className="mt-3 max-w-2xl text-neutral-600">
            ?????????????????????????????????????
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">? {productCatalog.length} ???????????</p>
          <Link
            href="/contact/"
            className="rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            ????
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productCatalog.map((slot) => (
            <ImageSlot key={slot.label} {...slot} aspect="square" />
          ))}
        </div>
      </section>
    </div>
  );
}
