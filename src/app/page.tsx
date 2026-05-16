import HomePageContent from '@/components/home/HomePageContent';

export const revalidate = 0;

/** 首页使用固定架构模板（6 公司位 + 6 产品位），便于自行替换图文。 */
export default function HomePage() {
  return <HomePageContent />;
}
