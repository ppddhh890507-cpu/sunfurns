export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">设置</h1>
      
      <div className="bg-white rounded-xl shadow p-6 max-w-2xl">
        <h2 className="text-xl font-bold mb-6">网站配置</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">网站名称</label>
            <input
              type="text"
              defaultValue="Sunfurns"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">默认语言</label>
            <select defaultValue="en" className="w-full border rounded-lg px-3 py-2">
              <option value="en">English</option>
              <option value="zh">中文</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">货币单位</label>
            <select defaultValue="USD" className="w-full border rounded-lg px-3 py-2">
              <option value="USD">USD ($)</option>
              <option value="CNY">CNY (¥)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>

          <div className="pt-4 border-t">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              保存设置
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 max-w-2xl mt-6">
        <h2 className="text-xl font-bold mb-4">数据库</h2>
        <p className="text-gray-600 mb-4">网站使用本地 SQLite 数据库存储数据。</p>
        <div className="flex gap-4">
          <button className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
            备份数据库
          </button>
          <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200">
            重置数据库
          </button>
        </div>
      </div>
    </div>
  );
}