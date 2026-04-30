import { supabase } from '@/lib/supabase';

type PageProps = {
  params: { slug: string };
};

export default async function Page({ params }: PageProps) {
  const { data: page, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error || !page) {
    return <div>Page not found</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content || '' }} />
    </div>
  );
}
