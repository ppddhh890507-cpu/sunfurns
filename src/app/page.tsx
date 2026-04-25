import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Sofa Manufacturer
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Factory direct pricing with OEM/ODM capabilities. 
              Your trusted B2B partner for quality furniture.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/contact" className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get a Quote
              </Link>
              <Link href="/products" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors">
                View Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Why Choose Sunfurns</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🏭</div>
              <h3 className="text-xl font-semibold mb-2">Factory Direct</h3>
              <p className="text-gray-600">Competitive pricing without middlemen</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">OEM/ODM Available</h3>
              <p className="text-gray-600">Custom designs to meet your specifications</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-semibold mb-2">MOQ: 10 Sets</h3>
              <p className="text-gray-600">Flexible order quantities for businesses</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🚢</div>
              <h3 className="text-xl font-semibold mb-2">Global Shipping</h3>
              <p className="text-gray-600">Reliable delivery to worldwide destinations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Fabric Sofas", desc: "Comfortable and durable fabric sofas for living rooms" },
              { name: "Leather Sofas", desc: "Premium leather sofas with modern designs" },
              { name: "Modular Sofas", desc: "Customizable modular sofas for any space" },
            ].map((product, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gray-200 border-2 border-dashed rounded-t-lg h-48" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.desc}</p>
                  <Link href="/products" className="text-blue-900 font-semibold hover:underline">
                    View More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Order?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote. 
            We respond within 24 hours.
          </p>
          <Link href="/contact" className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Contact Now
          </Link>
        </div>
      </section>
    </div>
  );
}
