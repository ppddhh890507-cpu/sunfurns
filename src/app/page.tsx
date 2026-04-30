import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              专业沙发制造商
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              源头工厂直供价，提供OEM/ODM定制服务。您的优质家具B2B合作伙伴。
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/contact" className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                获取报价
              </Link>
              <Link href="/products" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors">
                浏览产品
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">为什么选择我们</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🏭</div>
              <h3 className="text-xl font-semibold mb-2">工厂直供</h3>
              <p className="text-gray-600">无中间商，价格有竞争力</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">OEM/ODM定制</h3>
              <p className="text-gray-600">按需定制，满足您的规格要求</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-semibold mb-2">起订量：10套</h3>
              <p className="text-gray-600">灵活订单量，适合各类企业</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🚢</div>
              <h3 className="text-xl font-semibold mb-2">全球发货</h3>
              <p className="text-gray-600">可靠配送，抵达世界各地</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">我们的产品</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "布艺沙发", desc: "舒适耐用的布艺沙发，适用于客厅" },
              { name: "真皮沙发", desc: "现代设计的高品质真皮沙发" },
              { name: "模块沙发", desc: "可定制的模块化沙发，适应任何空间" },
            ].map((product, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gray-200 border-2 border-dashed rounded-t-lg h-48" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.desc}</p>
                  <Link href="/products" className="text-blue-900 font-semibold hover:underline">
                    查看更多 →
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
          <h2 className="text-3xl font-bold mb-4">准备好开始订购了吗？</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            立即联系我们，免费咨询和报价。我们将在24小时内回复。
          </p>
          <Link href="/contact" className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            立即联系
          </Link>
        </div>
      </section>
    </div>
  );
}