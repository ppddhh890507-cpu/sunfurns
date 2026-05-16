import ProductsPageContent from '@/components/products/ProductsPageContent';

export const metadata = {
  title: '产品中心 - Sunfurns | 专业沙发制造商',
  description: '浏览沙发与家具系列，支持 OEM/ODM 定制。',
};

export const revalidate = 0;

export default function ProductsPage() {
  return <ProductsPageContent />;
}
