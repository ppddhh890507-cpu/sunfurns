export default async function AdminDashboard() {
  // Fetch stats from API
  let productsCount = 0;
  let pagesCount = 0;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    // Use internal API call
    const productsRes = await fetch(`${baseUrl}/api/products`, { 
      cache: 'no-store',
      headers: { 'x-internal': 'true' }
    });
    const productsData = await productsRes.json();
    if (productsData.success) {
      productsCount = productsData.data?.length || 0;
    }
  } catch {
    // Fallback to 0
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const pagesRes = await fetch(`${baseUrl}/api/pages`, { cache: 'no-store' });
    const pagesData = await pagesRes.json();
    if (pagesData.success) {
      pagesCount = pagesData.data?.length || 0;
    }
  } catch {
    // Fallback to 0
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">控制台</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl">📦</div>
            <div>
              <p className="text-gray-500 text-sm">产品数量</p>
              <p className="text-3xl font-bold">{productsCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl">📄</div>
            <div>
              <p className="text-gray-500 text-sm">页面数量</p>
              <p className="text-3xl font-bold">{pagesCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🌐</div>
            <div>
              <p className="text-gray-500 text-sm">运行状态</p>
              <p className="text-xl font-bold text-green-600">正常运行</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">快捷操作</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/admin/products" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-2">➕</div>
            <p className="font-medium">添加产品</p>
          </a>
          <a href="/admin/editor" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-2">🎨</div>
            <p className="font-medium">编辑页面</p>
          </a>
          <a href="/admin/pages" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-2">📝</div>
            <p className="font-medium">管理页面</p>
          </a>
          <a href="/" target="_blank" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-2xl mb-2">👁️</div>
            <p className="font-medium">查看前台</p>
          </a>
        </div>
      </div>
    </div>
  );
}