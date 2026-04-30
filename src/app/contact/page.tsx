"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    product: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("感谢您的询价！我们将在24小时内与您联系。");
    setFormData({ name: "", email: "", company: "", phone: "", message: "", product: "" });
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-4">联系我们</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          如有询价、报价或合作机会，请与我们联系。我们通常会在24小时内回复。
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">发送消息</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">姓名 *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="您的姓名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">邮箱 *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">公司</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="您的公司"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">电话/微信</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+86 138 xxxx xxxx"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">感兴趣的产品</label>
                <select
                  value={formData.product}
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">选择产品类别</option>
                  <option value="fabric-sofa">布艺沙发</option>
                  <option value="leather-sofa">真皮沙发</option>
                  <option value="modular-sofa">模块沙发</option>
                  <option value="office-furniture">办公家具</option>
                  <option value="custom">定制OEM/ODM</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">留言 *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请告诉我们您的需求..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                发送询价
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-2xl font-semibold mb-6">联系信息</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">📧</span>
                  <div>
                    <h3 className="font-medium">邮箱</h3>
                    <p className="text-gray-600">info@sunfurns.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">📱</span>
                  <div>
                    <h3 className="font-medium">微信/电话</h3>
                    <p className="text-gray-600">+86 138 0013 8000</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">💬</span>
                  <div>
                    <h3 className="font-medium">微信</h3>
                    <p className="text-gray-600">sunfurns</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">⏰</span>
                  <div>
                    <h3 className="font-medium">工作时间</h3>
                    <p className="text-gray-600">周一至周五: 9:00 - 18:00 (北京时间)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg shadow-md p-8">
              <h2 className="text-xl font-semibold mb-4">快速回复</h2>
              <p className="text-gray-600 mb-4">
                我们通常会在24小时内回复所有询价。如有紧急事项，请通过微信联系我们。
              </p>
              <div className="bg-gray-200 border-2 border-dashed rounded-lg h-32 flex items-center justify-center">
                <span className="text-gray-500">微信二维码</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}