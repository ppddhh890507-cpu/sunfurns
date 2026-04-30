'use client';

import { useState, useEffect, useRef } from 'react';

// Import GrapesJS CSS
import 'grapesjs/dist/css/grapes.min.css';

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
          height: 'calc(100vh - 120px)',
          storageManager: false,
          fromElement: false,
          noticeOnUnload: false,
          avoidInlineStyle: true,
          blockManager: {
            appendTo: '#blocks'
          },
          styleManager: {
            clearProperties: true,
            sectors: [{
              name: '样式',
              open: false,
              buildProps: ['width', 'height', 'max-width', 'min-height', 'padding', 'margin'],
            }]
          },
          // Don't use external preset, use built-in commands only
          canvas: {
            styles: ['https://cdn.jsdelivr.net/npm/grapesjs/dist/css/grapes.min.css']
          }
        });

        // Add some basic blocks
        editor.Blocks.add('text', {
          label: '文本',
          content: '<div style="padding:10px;">编辑这段文本</div>',
          category: '基础组件',
        });

        editor.Blocks.add('image', {
          label: '图片',
          content: '<div style="padding:20px;text-align:center;background:#f5f5f5;border:1px dashed #ccc;border-radius:4px;color:#999;">📷 点击添加图片</div>',
          category: '基础组件',
        });

        editor.Blocks.add('heading', {
          label: '标题',
          content: '<h2 style="padding:10px;font-size:24px;font-weight:bold;">标题内容</h2>',
          category: '基础组件',
        });

        editor.Blocks.add('button', {
          label: '按钮',
          content: '<div style="padding:10px;"><a href="#" style="background:#1e3a5f;color:white;padding:10px 24px;border-radius:6px;text-decoration:none;display:inline-block;">点击按钮</a></div>',
          category: '基础组件',
        });

        editor.Blocks.add('section', {
          label: '区块',
          content: '<div style="padding:40px 20px;background:#f9f9f9;min-height:100px;"><div style="max-width:1200px;margin:0 auto;">区块内容</div></div>',
          category: '结构',
        });

        editor.Blocks.add('columns-2', {
          label: '两列',
          content: '<div style="display:flex;gap:20px;padding:20px;"><div style="flex:1;min-height:60px;background:#f0f0f0;padding:10px;border-radius:4px;">左列</div><div style="flex:1;min-height:60px;background:#f0f0f0;padding:10px;border-radius:4px;">右列</div></div>',
          category: '结构',
        });

        editor.Blocks.add('columns-3', {
          label: '三列',
          content: '<div style="display:flex;gap:16px;padding:20px;"><div style="flex:1;min-height:60px;background:#f0f0f0;padding:10px;border-radius:4px;">列1</div><div style="flex:1;min-height:60px;background:#f0f0f0;padding:10px;border-radius:4px;">列2</div><div style="flex:1;min-height:60px;background:#f0f0f0;padding:10px;border-radius:4px;">列3</div></div>',
          category: '结构',
        });

        editor.on('load', () => {
          const headerContainer = document.getElementById('editor-header');
          if (headerContainer) {
            headerContainer.style.display = 'flex';
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
          '<div style="text-align:center;padding:80px 20px;font-family:sans-serif">' +
          '<h1 style="font-size:32px;color:#333;margin-bottom:16px">编辑此页面</h1>' +
          '<p style="color:#999;font-size:16px">从左侧面板拖拽组件到此处</p></div>'
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Top bar */}
      <div
        id="editor-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          background: '#1a1a2e',
          color: 'white',
          flexShrink: 0
        }}
      >
        <h1 style={{ fontSize: 16, fontWeight: 'bold', margin: 0 }}>Sunfurns 可视化编辑器</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <select
            value={selectedPage}
            onChange={handlePageChange}
            style={{
              padding: '4px 8px',
              borderRadius: 4,
              border: '1px solid #ccc',
              color: '#333',
              minWidth: 160,
              fontSize: 13,
            }}
          >
            <option value="">选择页面...</option>
            {pages.map(p => (
              <option key={p.id} value={p.id}>{p.title} ({p.slug})</option>
            ))}
          </select>
          <button
            onClick={handleSave}
            disabled={!selectedPage || saving}
            style={{
              padding: '5px 16px',
              borderRadius: 4,
              border: 'none',
              background: selectedPage && !saving ? '#2563eb' : '#6b7280',
              color: 'white',
              fontSize: 13,
              cursor: selectedPage && !saving ? 'pointer' : 'not-allowed',
            }}
          >
            {saving ? '保存中...' : '保存页面'}
          </button>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '8px 16px', fontSize: 13 }}>
          {error}
        </div>
      )}
      {loading && (
        <div style={{ background: '#dbeafe', color: '#1e40af', padding: '8px 16px', fontSize: 13 }}>
          加载中...
        </div>
      )}

      {/* GrapesJS container */}
      <div ref={containerRef} style={{ flex: 1 }} />

      {/* Footer */}
      <div style={{
        background: '#f3f4f6',
        color: '#6b7280',
        fontSize: 12,
        padding: '4px 16px',
        flexShrink: 0,
        borderTop: '1px solid #e5e7eb'
      }}>
        拖拽左侧面板中的组件到画布进行编辑，完成后点击"保存页面"
      </div>
    </div>
  );
}