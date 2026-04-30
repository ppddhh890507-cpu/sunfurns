'use client';

import { useState, useEffect, useRef } from 'react';

export default function VisualEditorPage() {
  const [selectedPage, setSelectedPage] = useState('');
  const [pages, setPages] = useState<{ id: string; slug: string; title: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editorReady, setEditorReady] = useState(false);
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    if (initializedRef.current || !containerRef.current) return;
    initializedRef.current = true;

    // Load GrapesJS from CDN to avoid module resolution issues
    const loadEditor = async () => {
      try {
        // Load CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/grapesjs@0.22.16/dist/css/grapes.min.css';
        document.head.appendChild(link);

        // Load JS - can't use unpkg for esm, so use dynamic import from npm
        const grapesjs = (await import('grapesjs')).default;
        if (!containerRef.current) return;

        const editor = grapesjs.init({
          container: containerRef.current,
          height: 'calc(100vh - 130px)',
          width: 'auto',
          storageManager: false,
          fromElement: false,
          noticeOnUnload: false,
          avoidInlineStyle: true,
          canvas: {},
          selectorManager: { custom: true },
          styleManager: {
            clearProperties: false,
            sectors: [
              { name: '尺寸', open: false, buildProps: ['width', 'height', 'max-width', 'min-height', 'padding', 'margin', 'display'] },
              { name: '背景', open: false, buildProps: ['background-color', 'background-image'] },
              { name: '文本', open: false, buildProps: ['font-size', 'font-weight', 'color', 'text-align', 'line-height'] },
              { name: '边框', open: false, buildProps: ['border-width', 'border-color', 'border-radius'] },
            ]
          },
          blockManager: {
            appendTo: '',
            blocks: []
          }
        });

        // Add custom blocks
        editor.Blocks.add('text-block', {
          label: '文本',
          content: '<div style="padding:15px;font-size:15px;">编辑这段文本内容</div>',
          category: '内容',
        });

        editor.Blocks.add('heading1', {
          label: '大标题',
          content: '<h1 style="padding:15px;font-size:32px;font-weight:bold;margin:0;">大标题</h1>',
          category: '内容',
        });

        editor.Blocks.add('heading2', {
          label: '中标题',
          content: '<h2 style="padding:15px;font-size:24px;font-weight:bold;margin:0;">中标题</h2>',
          category: '内容',
        });

        editor.Blocks.add('image', {
          label: '图片',
          content: '<div style="padding:20px;text-align:center;"><img src="https://placehold.co/400x300/eee/999?text=图片" alt="图片" style="max-width:100%;border-radius:4px;" /></div>',
          category: '内容',
        });

        editor.Blocks.add('button', {
          label: '按钮',
          content: '<div style="padding:15px;"><a href="#" style="display:inline-block;padding:10px 30px;background:#1e3a5f;color:white;text-decoration:none;border-radius:6px;font-size:15px;">了解更多</a></div>',
          category: '内容',
        });

        editor.Blocks.add('section', {
          label: '通栏区块',
          content: '<section style="padding:60px 20px;"><div style="max-width:1200px;margin:0 auto;">在这里编辑区块内容</div></section>',
          category: '布局',
        });

        editor.Blocks.add('two-cols', {
          label: '两列布局',
          content: '<div style="display:flex;gap:24px;padding:20px;"><div style="flex:1;min-height:80px;padding:15px;background:#f5f5f5;border-radius:4px;">左列</div><div style="flex:1;min-height:80px;padding:15px;background:#f0f0f0;border-radius:4px;">右列</div></div>',
          category: '布局',
        });

        editor.Blocks.add('three-cols', {
          label: '三列布局',
          content: '<div style="display:flex;gap:20px;padding:20px;"><div style="flex:1;min-height:80px;padding:10px;background:#f5f5f5;border-radius:4px;">列1</div><div style="flex:1;min-height:80px;padding:10px;background:#f0f0f0;border-radius:4px;">列2</div><div style="flex:1;min-height:80px;padding:10px;background:#ebebeb;border-radius:4px;">列3</div></div>',
          category: '布局',
        });

        editor.Blocks.add('video', {
          label: '视频',
          content: '<div style="padding:20px;text-align:center;"><iframe src="https://www.youtube.com/embed/placeholder" frameborder="0" style="max-width:100%;width:560px;height:315px;border-radius:4px;"></iframe></div>',
          category: '内容',
        });

        editor.Blocks.add('divider', {
          label: '分割线',
          content: '<hr style="border:none;border-top:1px solid #ddd;margin:20px 0;" />',
          category: '内容',
        });

        // Listen for selection / edit events
        editor.on('component:selected', () => {});
        editor.on('block:drag:stop', () => {});

        editorRef.current = editor;
        setEditorReady(true);
        setError(null);
      } catch (err) {
        console.error('Editor init error:', err);
        setError('编辑器加载失败: ' + String(err));
      }
    };

    loadEditor();

    return () => {
      if (editorRef.current && !editorRef.current.destroyed) {
        try { editorRef.current.destroy(); } catch {}
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

      // Clear and set content
      if (pageData.gjs_html && pageData.gjs_html.trim() && pageData.gjs_html !== '<body></body>') {
        editor.setComponents(pageData.gjs_html);
        if (pageData.gjs_css) editor.setStyle(pageData.gjs_css);
      } else if (pageData.content && pageData.content.trim()) {
        editor.setComponents(pageData.content);
      } else {
        // Empty page - show editable placeholder
        editor.setComponents(
          '<div style="text-align:center;padding:100px 20px;font-family:Arial,sans-serif">' +
          '<h1 style="font-size:36px;color:#333;margin:0 0 12px">这是一个空白页面</h1>' +
          '<p style="color:#999;font-size:16px;margin:0">点击左侧「块」面板拖拽组件开始编辑</p></div>'
        );
        editor.setStyle('');
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
          gjsHtml: editor.getHtml(),
          gjsCss: editor.getCss()
        })
      });
      const result = await res.json();
      if (result.success) alert('页面保存成功！');
      else throw new Error(result.error);
    } catch (err) {
      setError('保存失败: ' + String(err));
    } finally {
      setSaving(false);
    }
  };

  if (!editorReady) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 40, height: 40, border: '3px solid #e5e7eb', borderTopColor: '#2563eb',
            borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px'
          }} />
          <p style={{ color: '#6b7280', margin: 0 }}>编辑器加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', fontFamily: 'Arial, sans-serif' }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 16px', background: '#1e293b', color: 'white', flexShrink: 0, zIndex: 10
      }}>
        <h1 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>Sunfurns 可视化编辑器</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <select
            value={selectedPage}
            onChange={handlePageChange}
            style={{
              padding: '5px 10px', borderRadius: 4, border: '1px solid #475569',
              background: '#334155', color: 'white', minWidth: 160, fontSize: 13
            }}
          >
            <option value="">选择页面...</option>
            {pages.map(p => (
              <option key={p.id} value={p.id}>{p.title || p.slug} ({p.slug})</option>
            ))}
          </select>
          <button
            onClick={handleSave}
            disabled={!selectedPage || saving}
            style={{
              padding: '5px 16px', borderRadius: 4, border: 'none',
              background: selectedPage && !saving ? '#2563eb' : '#475569',
              color: 'white', fontSize: 13, cursor: selectedPage && !saving ? 'pointer' : 'not-allowed'
            }}
          >
            {saving ? '保存中...' : '保存页面'}
          </button>
        </div>
      </div>

      {/* Error/Loading bar */}
      {error && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '6px 16px', fontSize: 13 }}>
          ⚠️ {error}
        </div>
      )}
      {loading && (
        <div style={{ background: '#dbeafe', color: '#1e40af', padding: '6px 16px', fontSize: 13 }}>
          加载中...
        </div>
      )}

      {/* Editor container */}
      <div ref={containerRef} style={{ flex: 1 }} />

      {/* Footer hint */}
      <div style={{
        background: '#f1f5f9', color: '#64748b', fontSize: 11,
        padding: '4px 16px', flexShrink: 0, borderTop: '1px solid #e2e8f0'
      }}>
        ① 上方选择页面 → ② 从左侧"块"面板拖拽组件到画布 → ③ 点击画布元素编辑属性 → ④ 点击"保存页面"
      </div>

      <style jsx global>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}