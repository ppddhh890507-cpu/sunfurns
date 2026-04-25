export const metadata = {
  title: "FAQ - Sunfurns | Frequently Asked Questions",
  description: "Find answers to common questions about our products, ordering process, shipping, and more.",
};

export default function FAQ() {
  const faqs = [
    {
      q: "What is your minimum order quantity?",
      a: "Our MOQ is 10 sets per model. For custom OEM/ODM orders, the MOQ may vary depending on specifications."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept T/T (30% deposit, 70% balance before shipment), L/C at sight, and PayPal for small orders."
    },
    {
      q: "What is the production lead time?",
      a: "Standard orders: 15-25 days after deposit received. Custom/OEM orders: 25-35 days depending on complexity."
    },
    {
      q: "Do you offer OEM/ODM services?",
      a: "Yes, we have extensive experience in OEM/ODM. We can produce according to your designs, specifications, and brand requirements."
    },
    {
      q: "What are the shipping options?",
      a: "We offer FOB, CIF, DDU, and DDP. We work with reliable freight forwarders to ensure safe and timely delivery."
    },
    {
      q: "Do you provide samples?",
      a: "Yes, sample costs can be deducted from bulk orders. Sample lead time is 7-14 days."
    },
    {
      q: "What warranty do you provide?",
      a: "We provide 1-year warranty on all products. Warranty covers manufacturing defects under normal use."
    },
    {
      q: "Can I visit your factory?",
      a: "Absolutely! We welcome clients to visit our factory. Please contact us in advance to arrange your visit."
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-4">FAQ</h1>
        <p className="text-gray-600 text-center mb-12">
          Frequently asked questions about our products and services
        </p>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2 text-blue-900">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-blue-50 rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
          <p className="text-gray-600 mb-6">
            Contact us directly and we will get back to you within 24 hours.
          </p>
          <a href="/contact" className="btn-primary inline-block">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
