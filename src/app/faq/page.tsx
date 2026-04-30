export const metadata = {
  title: "常见问题 - Sunfurns | 常见问答",
  description: "查找关于我们产品、订购流程、运输等常见问题的答案。",
};

export default function FAQ() {
  const faqs = [
    {
      q: "最小起订量是多少？",
      a: "我们的起订量是每款10套。对于定制OEM/ODM订单，起订量可能因规格而异。"
    },
    {
      q: "你们接受哪些付款方式？",
      a: "我们接受T/T（30%定金，70%尾款发货前付清）、L/C即期，以及PayPal（小额订单）。"
    },
    {
      q: "生产交货期是多长？",
      a: "标准订单：收到定金后15-25天。定制/OEM订单：25-35天，视复杂程度而定。"
    },
    {
      q: "你们提供OEM/ODM服务吗？",
      a: "是的，我们有丰富的OEM/ODM经验。我们可以按照您的设计、规格和品牌要求生产。"
    },
    {
      q: "有哪些运输方式？",
      a: "我们提供FOB、CIF、DDU和DDP。我们与可靠货运代理合作，确保安全及时交付。"
    },
    {
      q: "你们提供样品吗？",
      a: "是的，样品费用可以从大货订单中扣除。样品交货期7-14天。"
    },
    {
      q: "你们提供什么保修？",
      a: "我们为所有产品提供1年保修。保修涵盖正常使用下的制造缺陷。"
    },
    {
      q: "我可以参观工厂吗？",
      a: "当然可以！我们欢迎客户参观工厂。请提前联系我们安排您的访问。"
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-4">常见问题</h1>
        <p className="text-gray-600 text-center mb-12">
          关于我们的产品和服务的常见问题
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
          <h3 className="text-xl font-semibold mb-4">还有问题吗？</h3>
          <p className="text-gray-600 mb-6">
            请直接联系我们，我们将在24小时内回复。
          </p>
          <a href="/contact" className="btn-primary inline-block">
            联系我们
          </a>
        </div>
      </div>
    </div>
  );
}