import { supabase } from '@/lib/supabase';

type PageParams = {
  params: {
    slug?: string;
  };
};

export default async function Page({ params }: PageParams) {
  // 如果是首页，slug 是空的，显示默认内容
  if (!params?.slug) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Sunfurns - Professional Sofa Manufacturer</h1>
        <p className="text-gray-600">Factory direct with OEM/ODM capabilities. Your trusted B2B partner for quality furniture.</p>
      </div>
    );
  }

  // 读取对应 slug 的页面数据
  const { data: page, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error || !page) {
    return <div className="container mx-auto py-12 px-4">页面不存在</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content || '' }} />
    </div>
  );
}
