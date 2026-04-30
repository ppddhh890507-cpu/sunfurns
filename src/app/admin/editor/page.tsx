'use client';

import { useState, useEffect, useRef } from 'react';

export default function VisualEditorPage() {
  const [selectedPage, setSelectedPage] = useState('');
  const [pages, setPages] = useState<{ id: string; slug: string; title: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  // Load pages list
  useEffect(() => {
    fetchPages();
  }, []);

  // Load GrapesJS only once
  useEffect(() => {
    if (initializedRef.current || !containerRef.current) return;
    initializedRef.current = true;

    let editor: any = null;

    const initEditor = async () => {
      const grapesjs = (await import('grapesjs')).default;
      const gjsPreset = (await import('grapesjs-preset-webpage')).default;

      if (!containerRef.current) return;

      editor = grapesjs.init({
        container: containerRef.current,
        height: 'calc(100vh - 140px)',
        storageManager: false,
        fromElement: false,
        plugins: [gjsPreset],
        pluginsOpts: {
          'gjs-preset-webpage': {}
        },
        assetManager: {
          assets: []
        },
        canvas: {
          styles: [],
          scripts: []
        },
        noticeOnUnload: false
      });

      editorRef.current = editor;
      setEditorReady(true);
    };

    initEditor().catch(console.error);

    return () => {
      if (editor && !editor.destroyed) {
        try {
          editor.destroy();
        } catch (e) {
          // Ignore cleanup errors
        }
      }
      editorRef.current = null;
      initializedRef.current = false;
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

  const loadPageContent = async () => {
    if (!selectedPage || !editorRef.current) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/pages/${selectedPage}`);
      const data = await res.json();

      if (data.success) {
        const editor = editorRef.current;
        const pageData = data.data;

        if (pageData.gjs_html && pageData.gjs_html.trim()) {
          try {
            editor.setComponents(pageData.gjs_html);
          } catch (e) {
            console.error('Failed to set components:', e);
          }

          if (pageData.gjs_css && pageData.gjs_css.trim()) {
            try {
              editor.setStyle(pageData.gjs_css);
            } catch (e) {
              console.error('Failed to set styles:', e);
            }
          }
        } else {
          editor.setComponents(`
            <div style="text-align: center; padding: 60px 20px;">
              <h1 style="font-size: 32px; color: #333; margin-bottom: 20px;">编辑此页面</h1>
              <p style="color: #666; font-size: 16px;">从左侧面板拖拽区块来添加内容</p>
            </div>
          `);
        }
      }
    } catch (error) {
      console.error('加载页面失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pageId = e.target.value;
    setSelectedPage(pageId);
    if (pageId) {
      loadPageContent();
    }
  };

  const handleSave = async () => {
    if (!selectedPage || !editorRef.current) return;

    setSaving(true);
    try {
      const editor = editorRef.current;
      const html = editor.getHtml();
      const css = editor.getCss();

      const res = await fetch(`/api/pages/${selectedPage}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gjsHtml: html,
          gjsCss: css
        })
      });

      const result = await res.json();
      if (result.success) {
        alert('页面保存成功！');
      } else {
        alert('保存失败: ' + result.error);
      }
    } catch (error) {
      console.error('保存失败:', error);
      alert('保存页面失败');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6">
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

      {!editorReady && (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <p className="text-gray-600">编辑器加载中...</p>
        </div>
      )}

      <div
        id="gjs"
        ref={containerRef}
        className={`bg-white rounded-xl shadow overflow-hidden ${editorReady ? '' : 'hidden'}`}
        style={{ minHeight: '600px' }}
      />

      <div className="mt-4 text-gray-500 text-sm">
        <p><strong>提示：</strong>选择左侧页面后，从顶部面板拖拽区块到画布中。点击元素进行属性编辑。完成编辑后点击"保存页面"将内容保存到数据库。</p>
      </div>
    </div>
  );
}