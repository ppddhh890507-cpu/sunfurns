export const metadata = {
  title: "产品中心 - Sunfurns | 专业沙发制造商",
  description: "浏览我们的沙发和家具系列。布艺沙发、真皮沙发、模块沙发等。提供OEM/ODM定制服务。",
};

export default function Products() {
  const products = [
    {
      category: "布艺沙发",
      items: ["现代布艺沙发", "经典布艺沙发", "L型布艺沙发", "布艺功能沙发"]
    },
    {
      category: "真皮沙发",
      items: ["意式真皮沙发", "现代真皮沙发", " executive 真皮沙发", "真皮功能沙发"]
    },
    {
      category: "模块沙发",
      items: ["定制模块沙发", "转角沙发", "可变沙发床"]
    },
    {
      category: "办公家具",
      items: ["Executive 椅子", "办公沙发", "接待沙发"]
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-4">产品中心</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          专业沙发制造商，提供多种家具系列。所有产品均可提供OEM/ODM定制服务。
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
          <h3 className="text-2xl font-semibold mb-4">需要定制产品吗？</h3>
          <p className="text-gray-600 mb-6">
            我们提供OEM/ODM服务。发送您的规格要求，我们将为您提供定制报价。
          </p>
          <a href="/contact" className="btn-primary inline-block">
            获取定制报价
          </a>
        </div>
      </div>
    </div>
  );
}