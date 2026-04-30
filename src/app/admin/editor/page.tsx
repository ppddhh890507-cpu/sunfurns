'use client';

import { useState, useEffect, useRef } from 'react';

export default function VisualEditorPage() {
  const [selectedPage, setSelectedPage] = useState('');
  const [pages, setPages] = useState<{ id: string; slug: string; title: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    let editor: any = null;

    const init = async () => {
      try {
        const grapesjs = (await import('grapesjs')).default;
        if (!containerRef.current) return;

        editor = grapesjs.init({
          container: containerRef.current,
          height: 'calc(100vh - 160px)',
          storageManager: false,
          fromElement: false,
          // Don't use gjs-preset-webpage - it causes issues
          noticeOnUnload: false,
          avoidInlineStyle: true,
          canvas: {},
          styleManager: {
            sectors: []
          }
        });

        editorRef.current = editor;
        setError(null);
      } catch (err) {
        console.error('Editor init failed:', err);
        setError('编辑器加载失败: ' + String(err));
      }
    };

    init();

    return () => {
      if (editor) {
        try { editor.destroy(); } catch {}
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
      else setError('获取页面列表失败: ' + data.error);
    } catch (err) {
      setError('获取页面列表失败: ' + String(err));
    }
  };

  const loadPageContent = async () => {
    if (!selectedPage || !editorRef.current) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/pages/${selectedPage}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      const editor = editorRef.current;
      const pageData = data.data;

      if (pageData.gjs_html && pageData.gjs_html.trim()) {
        editor.setComponents(pageData.gjs_html);
        if (pageData.gjs_css) editor.setStyle(pageData.gjs_css);
      } else if (pageData.content && pageData.content.trim()) {
        editor.setComponents(pageData.content);
      } else {
        editor.setComponents(
          '<div style="text-align:center;padding:40px 20px;font-family:sans-serif">' +
          '<h1 style="font-size:28px;color:#333;margin-bottom:16px">编辑此页面</h1>' +
          '<p style="color:#999;font-size:14px">在此添加内容</p></div>'
        );
      }
    } catch (err) {
      setError('加载页面失败: ' + String(err));
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pageId = e.target.value;
    setSelectedPage(pageId);
    if (pageId) loadPageContent();
  };

  const handleSave = async () => {
    if (!selectedPage || !editorRef.current) return;
    setSaving(true);
    setError(null);
    try {
      const editor = editorRef.current;
      const res = await fetch(`/api/pages/${selectedPage}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titleEn: pages.find(p => p.id === selectedPage)?.title || '',
          gjsHtml: editor.getHtml(),
          gjsCss: editor.getCss()
        })
      });
      const result = await res.json();
      if (result.success) alert('页面保存成功！');
      else setError('保存失败: ' + result.error);
    } catch (err) {
      setError('保存失败: ' + String(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white shrink-0">
        <h1 className="text-lg font-bold">可视化编辑器</h1>
        <div className="flex items-center gap-3">
          <select
            value={selectedPage}
            onChange={handlePageChange}
            className="text-black px-3 py-1.5 rounded border min-w-[180px] text-sm"
          >
            <option value="">选择页面...</option>
            {pages.map(p => (
              <option key={p.id} value={p.id}>{p.title} ({p.slug})</option>
            ))}
          </select>
          <button
            onClick={handleSave}
            disabled={!selectedPage || saving}
            className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? '保存中...' : '保存'}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-700 px-6 py-2 text-sm">{error}</div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-blue-100 text-blue-700 px-6 py-2 text-sm">加载中...</div>
      )}

      {/* Editor container */}
      <div ref={containerRef} className="flex-1" />

      {/* Footer hint */}
      <div className="bg-gray-100 text-gray-500 text-xs px-6 py-1.5 shrink-0">
        拖拽左侧组件到画布，选择元素编辑属性，完成后点击"保存"
      </div>
    </div>
  );
}