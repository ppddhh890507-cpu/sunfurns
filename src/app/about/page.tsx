export const metadata = {
  title: "关于我们 - Sunfurns | 专业沙发制造商",
  description: "了解Sunfurns，超过10年B2B家具解决方案经验的专业沙发制造商。",
};

export default function About() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-4">关于我们</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          您在专业家具制造领域的可靠合作伙伴
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="bg-gray-200 border-2 border-dashed rounded-lg h-80" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">我们的故事</h2>
            <p className="text-gray-600 mb-4">
              Sunfurns是一家专业沙发制造商，拥有超过10年为全球市场生产优质家具的经验。
            </p>
            <p className="text-gray-600 mb-4">
              我们专注于B2B解决方案，提供OEM/ODM服务以满足您的特定需求。我们的工厂占地10,000+平方米，配备先进生产设备。
            </p>
            <p className="text-gray-600">
              我们的产品出口到全球客户，包括北美、欧洲、东南亚和中东地区。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            { num: "10+", label: "年行业经验" },
            { num: "10,000+", label: "平方米工厂" },
            { num: "50+", label: "服务国家" },
            { num: "500+", label: "满意客户" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">{stat.num}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">我们的优势</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "质量保证", desc: "每个生产阶段都有严格的质量控制" },
              { title: "价格优势", desc: "工厂直供价格" },
              { title: "灵活起订量", desc: "最低10套起订" },
              { title: "快速生产", desc: "15-30天交货期" },
              { title: "全球发货", desc: "支持FOB、CIF、DDU" },
              { title: "售后服务", desc: "1年质保" },
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