type ContactInquiryFormProps = {
  className?: string;
};

export default function ContactInquiryForm({ className = '' }: ContactInquiryFormProps) {
  return (
    <div className={`rounded-lg border border-neutral-200 bg-white p-6 shadow-sm sm:p-8 ${className}`}>
      <h2 className="text-2xl font-semibold text-neutral-900 mb-6">发送消息</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">姓名 *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#f47321] focus:border-transparent"
              placeholder="您的姓名"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">邮箱 *</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#f47321] focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">公司</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#f47321] focus:border-transparent"
              placeholder="您的公司"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">电话/微信</label>
            <input
              type="tel"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#f47321] focus:border-transparent"
              placeholder="+86 138 xxxx xxxx"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">感兴趣的产品</label>
          <select className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#f47321] focus:border-transparent">
            <option value="">选择产品类别</option>
            <option value="fabric-sofa">布艺沙发</option>
            <option value="leather-sofa">真皮沙发</option>
            <option value="modular-sofa">模块沙发</option>
            <option value="office-furniture">办公家具</option>
            <option value="custom">定制 OEM/ODM</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">留言 *</label>
          <textarea
            required
            rows={4}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#f47321] focus:border-transparent"
            placeholder="请告诉我们您的需求..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-neutral-900 text-white py-3 rounded-lg font-semibold hover:bg-neutral-800 transition-colors"
        >
          发送询价
        </button>
      </form>
    </div>
  );
}
