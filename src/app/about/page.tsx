export const metadata = {
  title: "About Us - Sunfurns | Professional Sofa Manufacturer",
  description: "Learn about Sunfurns, a professional sofa manufacturer with 10+ years of experience in B2B furniture solutions.",
};

export default function About() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-4">About Sunfurns</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Your trusted partner in professional furniture manufacturing
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="bg-gray-200 border-2 border-dashed rounded-lg h-80" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Sunfurns is a professional sofa manufacturer with over 10 years of experience 
              in producing high-quality furniture for global markets.
            </p>
            <p className="text-gray-600 mb-4">
              We specialize in B2B solutions, offering OEM/ODM services to meet your 
              specific requirements. Our factory covers 10,000+ square meters with 
              advanced production equipment.
            </p>
            <p className="text-gray-600">
              Our products are exported to clients worldwide, including North America, 
              Europe, Southeast Asia, and the Middle East.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            { num: "10+", label: "Years Experience" },
            { num: "10,000+", label: "Sq Meters Factory" },
            { num: "50+", label: "Countries Served" },
            { num: "500+", label: "Happy Clients" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">{stat.num}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Our Advantages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Quality Assurance", desc: "Strict QC at every production stage" },
              { title: "Competitive Pricing", desc: "Factory direct prices" },
              { title: "Flexible MOQ", desc: "Starting from 10 sets" },
              { title: "Fast Production", desc: "15-30 days lead time" },
              { title: "Global Shipping", desc: "FOB, CIF, DDU available" },
              { title: "After-Sales Support", desc: "1-year warranty" },
            ].map((adv, i) => (
              <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold mb-2">{adv.title}</h3>
                <p className="text-gray-600 text-sm">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
