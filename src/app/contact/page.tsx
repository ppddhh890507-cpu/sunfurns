import ContactInfoCard from '@/components/contact/ContactInfoCard';
import ContactInquiryForm from '@/components/contact/ContactInquiryForm';
import CmsPageView from '@/components/CmsPageView';
import { loadCmsPageBySlug } from '@/lib/load-cms-page';

export const revalidate = 0;

export default async function ContactPage() {
  const cms = await loadCmsPageBySlug('contact');
  if (cms) {
    return <CmsPageView html={cms.html} css={cms.css} />;
  }

  return (
    <div className="bg-neutral-50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-neutral-900 sm:text-4xl">联系我们</h1>
        <p className="text-neutral-600 text-center mt-3 mb-10 max-w-2xl mx-auto">
          如有询价、报价或合作机会，请与我们联系。我们通常会在 24 小时内回复。
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ContactInquiryForm />
          <ContactInfoCard />
        </div>
      </div>
    </div>
  );
}
