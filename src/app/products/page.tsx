export const metadata = {
  title: "Products - Sunfurns | Professional Sofa Manufacturer",
  description: "Explore our wide range of sofas and furniture. Fabric sofas, leather sofas, modular sofas, and more. OEM/ODM available.",
};

export default function Products() {
  const products = [
    {
      category: "Fabric Sofas",
      items: ["Modern Fabric Sofa", "Classic Fabric Sofa", "L-Shaped Fabric Sofa", "Fabric Recliner"]
    },
    {
      category: "Leather Sofas",
      items: ["Italian Leather Sofa", "Modern Leather Sofa", "Executive Leather Sofa", "Leather Recliner"]
    },
    {
      category: "Modular Sofas",
      items: ["Custom Modular Sofa", "Sectional Sofa", "Convertible Sofa Bed"]
    },
    {
      category: "Office Furniture",
      items: ["Executive Chair", "Office Sofa", "Reception Sofa"]
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-4">Our Products</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Professional sofa manufacturer offering a wide range of furniture. 
          All products available with OEM/ODM customization.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((cat, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-900">{cat.category}</h2>
              <ul className="space-y-2">
                {cat.items.map((item, j) => (
                  <li key={j} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-900 rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-semibold mb-4">Looking for Custom Products?</h3>
          <p className="text-gray-600 mb-6">
            We offer OEM/ODM services. Send us your specifications and we will provide a custom quote.
          </p>
          <a href="/contact" className="btn-primary inline-block">
            Request Custom Quote
          </a>
        </div>
      </div>
    </div>
  );
}
