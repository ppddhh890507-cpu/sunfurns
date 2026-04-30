'use client';

import { useState, useEffect, useRef } from 'react';

export default function VisualEditorPage() {
  const [selectedPage, setSelectedPage] = useState('');
  const [pages, setPages] = useState<{ id: string; slug: string; title: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPages();
    loadGrapesJS();
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/pages');
      const data = await res.json();
      if (data.success) setPages(data.data);
    } catch (error) {
      console.error('获取页面列表失败:', error);
    }
  };

  const loadGrapesJS = async () => {
    const grapesjs = (await import('grapesjs')).default;
    const gjsPreset = (await import('grapesjs-preset-webpage')).default;
    
    if (containerRef.current && !editorRef.current) {
      editorRef.current = grapesjs.init({
        container: '#gjs',
        height: 'calc(100vh - 120px)',
        storageManager: false,
        plugins: [gjsPreset],
        pluginsOpts: {
          'gjs-preset-webpage': {}
        },
        canvas: {
          styles: ['/globals.css'],
          scripts: ['/main.js']
        }
      });

      editorRef.current.on('storage:store', async (data: any) => {
        console.log('自动保存:', data);
      });
    }
  };

  const loadPageContent = async () => {
    if (!selectedPage || !editorRef.current) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/pages/${selectedPage}`);
      const data = await res.json();
      if (data.success && data.data.gjs_html) {
        editorRef.current.setComponents(data.data.gjs_html);
        if (data.data.gjs_css) {
          editorRef.current.setStyle(data.data.gjs_css);
        }
      } else {
        editorRef.current.setComponents('<div class="text-center py-20"><h1 class="text-4xl">编辑此页面</h1><p>使用左侧面板拖拽区块来添加内容</p></div>');
      }
    } catch (error) {
      console.error('加载页面失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPage(e.target.value);
    loadPageContent();
  };

  const handleSave = async () => {
    if (!selectedPage || !editorRef.current) return;
    
    setSaving(true);
    try {
      const components = editorRef.current.getComponents();
      const css = editorRef.current.getCss();
      const html = editorRef.current.getHtml();
      
      await fetch(`/api/pages/${selectedPage}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gjsHtml: html,
          gjsCss: css
        })
      });
      alert('页面保存成功！');
    } catch (error) {
      console.error('保存失败:', error);
      alert('保存页面失败');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">可视化编辑器</h1>
        <div className="flex gap-4 items-center">
          <select
            value={selectedPage}
            onChange={handlePageChange}
            className="border rounded-lg px-4 py-2 min-w-[200px]"
          >
            <option value="">选择要编辑的页面...</option>
            {pages.map((page) => (
              <option key={page.id} value={page.id}>
                {page.title} ({page.slug})
              </option>
            ))}
          </select>
          <button
            onClick={handleSave}
            disabled={!selectedPage || saving}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? '保存中...' : '保存页面'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          正在加载页面内容...
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div id="gjs" ref={containerRef} className="min-h-[600px]" />
      </div>

      <div className="mt-4 text-gray-500 text-sm">
        <p><strong>提示：</strong>使用左侧面板拖拽区块。点击元素进行编辑。编辑完成后点击"保存页面"将内容保存到数据库。</p>
      </div>
    </div>
  );
}