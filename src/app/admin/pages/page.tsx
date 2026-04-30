'use client';

import { useState, useEffect } from 'react';

interface Page {
  id: string;
  slug: string;
  title: string;
  title_en: string;
  gjs_html: string;
  updated_at: string;
}

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPages(); }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/pages');
      const data = await res.json();
      if (data.success) setPages(data.data);
    } catch (error) {
      console.error('获取页面失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, slug: string) => {
    if (!confirm(`确定删除页面 "${slug}" 吗？此操作不可撤销。`)) return;
    try {
      const res = await fetch(`/api/pages/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchPages();
    } catch (error) {
      console.error('删除页面失败:', error);
    }
  };

  if (loading) return <div className="text-center py-8">加载中...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">页面管理</h1>
        <a
          href="/admin/editor"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + 创建新页面
        </a>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4">页面</th>
              <th className="text-left p-4">路径</th>
              <th className="text-left p-4">最后更新</th>
              <th className="text-left p-4">操作</th>
            </tr>
          </thead>
          <tbody>
            {pages.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  暂无页面
                </td>
              </tr>
            ) : (
              pages.map((page) => (
                <tr key={page.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium">{page.title}</div>
                    <div className="text-sm text-gray-500">{page.title_en}</div>
                  </td>
                  <td className="p-4">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">/{page.slug}</code>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(page.updated_at).toLocaleDateString('zh-CN', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </td>
                  <td className="p-4">
                    <a
                      href={`/admin/editor?page=${page.id}`}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      可视化编辑
                    </a>
                    <a
                      href={`/${page.slug}`}
                      target="_blank"
                      className="text-green-600 hover:text-green-800 mr-4"
                    >
                      预览
                    </a>
                    <button
                      onClick={() => handleDelete(page.id, page.slug)}
                      className="text-red-600 hover:text-red-800"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}