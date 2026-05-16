import ContactInfoCard from '@/components/contact/ContactInfoCard';
import ImageSlot from '@/components/ui/ImageSlot';
import Link from 'next/link';

const companySlots = [
  { label: '公司图 01', title: '公司信息标题', description: '在此填写公司简介、工厂实力或认证说明。' },
  { label: '公司图 02', title: '公司信息标题', description: '在此填写生产规模、产能或质量体系。' },
  { label: '公司图 03', title: '公司信息标题', description: '在此填写研发团队或设计能力。' },
  { label: '公司图 04', title: '公司信息标题', description: '在此填写出口经验或服务区域。' },
  { label: '公司图 05', title: '公司信息标题', description: '在此填写合作案例或客户类型。' },
  { label: '公司图 06', title: '公司信息标题', description: '在此填写企业文化或社会责任。' },
];

const productSlots = [
  { label: '产品图 01', title: '产品名称', description: '材质 / 尺寸 / MOQ — 在此填写产品简介。' },
  { label: '产品图 02', title: '产品名称', description: '材质 / 尺寸 / MOQ — 在此填写产品简介。' },
  { label: '产品图 03', title: '产品名称', description: '材质 / 尺寸 / MOQ — 在此填写产品简介。' },
  { label: '产品图 04', title: '产品名称', description: '材质 / 尺寸 / MOQ — 在此填写产品简介。' },
  { label: '产品图 05', title: '产品名称', description: '材质 / 尺寸 / MOQ — 在此填写产品简介。' },
  { label: '产品图 06', title: '产品名称', description: '材质 / 尺寸 / MOQ — 在此填写产品简介。' },
];

export default function HomePageContent() {
  return (
    <div className="bg-neutral-50">
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:items-start lg:gap-12 lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-[#f47321]">
              B2B 家具出口 · 工厂直供
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              专业沙发与家具制造商
            </h1>
            <p className="mt-4 text-lg text-neutral-600">
              简洁、可靠的跨境供货伙伴。支持 OEM/ODM，灵活起订，全球配送。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products/"
                className="inline-flex items-center rounded-md bg-neutral-900 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
              >
                浏览产品
              </Link>
              <Link
                href="/contact/"
                className="inline-flex items-center rounded-md border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
              >
                获取报价
              </Link>
            </div>
          </div>

          <ContactInfoCard compact className="lg:sticky lg:top-24" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">公司实力</h2>
            <p className="mt-1 text-neutral-500">预留 6 个图文位，展示工厂、团队与资质信息</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companySlots.map((slot) => (
            <ImageSlot key={slot.label} {...slot} aspect="video" />
          ))}
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">精选产品</h2>
              <p className="mt-1 text-neutral-500">预留 6 个产品位，上传图片并填写名称与参数</p>
            </div>
            <Link
              href="/products/"
              className="text-sm font-semibold text-[#f47321] hover:text-[#e55f10]"
            >
              查看全部产品 →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productSlots.map((slot) => (
              <ImageSlot key={slot.label} {...slot} aspect="square" />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
