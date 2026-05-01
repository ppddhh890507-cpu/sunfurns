'use client';

import { useState, useEffect, useRef } from 'react';

export default function VisualEditorPage() {
  const [selectedPage, setSelectedPage] = useState('');
  const [pages, setPages] = useState<{ id: string; slug: string; title: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    fetchPages();
  }, []);

  // Load GrapesJS from local static files
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    setDebug('1. 开始加载编辑器...');

    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/grapes.min.css';
    link.onload = () => setDebug(d => d + '\n2. CSS 加载成功');
    link.onerror = () => setDebug(d => d + '\n2. CSS 加载失败!');
    document.head.appendChild(link);

    // Load JS
    const script = document.createElement('script');
    script.src = '/grapes.min.js';
    script.onload = () => {
      setDebug(d => d + '\n3. JS 加载成功, 准备初始化...');

      const g = (window as any).grapesjs;
      if (!g) {
        setDebug(d => d + '\n3b. grapesjs 对象不存在!');
        setError('编辑器核心库加载异常');
        return;
      }

      setDebug(d => d + '\n4. 找到 grapesjs, 注册插件...');

      // Register blocks plugin
      g.plugins.add('gjs-local-blocks', (editor: any) => {
        editor.Blocks.add('text', { label: '文本', content: '<div style="padding:15px;font-size:15px;">编辑这段文本</div>', category: '内容' });
        editor.Blocks.add('heading1', { label: '大标题', content: '<h1 style="padding:15px;font-size:32px;font-weight:bold;">大标题</h1>', category: '内容' });
        editor.Blocks.add('heading2', { label: '中标题', content: '<h2 style="padding:15px;font-size:24px;font-weight:bold;">中标题</h2>', category: '内容' });
        editor.Blocks.add('image', { label: '图片', content: '<div style="padding:20px;text-align:center;"><img src="https://placehold.co/560x400/eee/999?text=添加图片" style="max-width:100%;border-radius:4px;" /></div>', category: '内容' });
        editor.Blocks.add('button', { label: '按钮', content: '<div style="padding:15px;"><a href="#" style="display:inline-block;padding:10px 30px;background:#1e3a5f;color:white;text-decoration:none;border-radius:6px;">了解更多</a></div>', category: '内容' });
        editor.Blocks.add('section', { label: '通栏区块', content: '<section style="padding:60px 20px;background:#f9f9f9;"><div style="max-width:1200px;margin:0 auto;">区块内容</div></section>', category: '布局' });
        editor.Blocks.add('two-cols', { label: '两列', content: '<div style="display:flex;gap:24px;padding:20px;"><div style="flex:1;padding:20px;background:#f5f5f5;">左列</div><div style="flex:1;padding:20px;background:#f0f0f0;">右列</div></div>', category: '布局' });
        editor.Blocks.add('three-cols', { label: '三列', content: '<div style="display:flex;gap:20px;padding:20px;"><div style="flex:1;padding:15px;background:#f5f5f5;">列1</div><div style="flex:1;padding:15px;background:#f0f0f0;">列2</div><div style="flex:1;padding:15px;background:#ebebeb;">列3</div></div>', category: '布局' });
        editor.Blocks.add('divider', { label: '分割线', content: '<hr style="border:none;border-top:1px solid #ddd;margin:20px 0;" />', category: '内容' });
        editor.Blocks.add('spacer', { label: '空白间距', content: '<div style="height:40px;"></div>', category: '布局' });
      });

      setDebug(d => d + '\n5. 插件注册完成, 检查容器...');

      // Check container
      const container = containerRef.current;
      if (!container) {
        setDebug(d => d + '\n5b. 容器不存在!');
        setError('编辑器容器未找到 (可能是页面加载顺序问题)');
        return;
      }

      setDebug(d => d + '\n6. 容器存在, 初始化编辑器...');

      try {
        const editor = g.init({
          container: container,
          height: 'calc(100vh - 110px)',
          storageManager: false,
          fromElement: false,
          noticeOnUnload: false,
          plugins: ['gjs-local-blocks'],
          pluginsOpts: { 'gjs-local-blocks': {} },
          styleManager: {
            sectors: [
              { name: '尺寸', open: false, buildProps: ['width', 'height', 'max-width', 'padding', 'margin', 'display'] },
              { name: '背景', open: false, buildProps: ['background-color', 'background-image'] },
              { name: '文本', open: false, buildProps: ['font-size', 'font-weight', 'color', 'text-align', 'line-height'] },
              { name: '边框', open: false, buildProps: ['border-width', 'border-color', 'border-radius'] },
            ]
          }
        });

        editorRef.current = editor;
        setDebug(d => d + '\n7. 编辑器初始化成功!');
        setError(null);
      } catch (err: any) {
        setDebug(d => d + '\n7b. 初始化失败: ' + err.message);
        setError('编辑器初始化失败: ' + err.message);
      }
    };

    script.onerror = () => {
      setDebug(d => d + '\n3e. JS 加载失败!');
      setError('编辑器核心库加载失败，请检查网络');
    };

    document.head.appendChild(script);
  }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/pages');
      const data = await res.json();
      if (data.success) setPages(data.data);
    } catch { setError('获取页面列表失败'); }
  };

  const loadPageContent = async () => {
    if (!selectedPage || !editorRef.current) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/pages/${selectedPage}`);
      const data = await res.json();
      if (!data.success) throw Error();

      const editor = editorRef.current;
      const p = data.data;
      const html = p.gjs_html?.trim();
      const css = p.gjs_css?.trim();

      if (html && html !== '<body></body>') {
        editor.setComponents(html);
        if (css) editor.setStyle(css);
      } else if (p.content?.trim()) {
        editor.setComponents(p.content);
      } else {
        editor.setComponents(
          '<div style="text-align:center;padding:100px 20px;font-family:Arial">' +
          '<h1 style="font-size:36px;color:#333;margin:0 0 12px">空白页面</h1>' +
          '<p style="color:#999;font-size:16px;margin:0">从左侧面板拖拽组件开始编辑</p></div>'
        );
        editor.setStyle('');
      }
    } catch { setError('加载页面失败'); }
    finally { setLoading(false); }
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPage(e.target.value);
    if (e.target.value) loadPageContent();
  };

  const handleSave = async () => {
    if (!selectedPage || !editorRef.current) return;
    setSaving(true);
    try {
      const editor = editorRef.current;
      const res = await fetch(`/api/pages/${selectedPage}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gjsHtml: editor.getHtml(), gjsCss: editor.getCss() })
      });
      const result = await res.json();
      if (result.success) alert('✅ 保存成功！');
      else throw Error();
    } catch { setError('保存失败'); }
    finally { setSaving(false); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', fontFamily: 'Arial, sans-serif' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', background: '#1e293b', color: 'white', flexShrink: 0 }}>
        <span style={{ fontWeight: 600, fontSize: 14 }}>Sunfurns 可视化编辑器</span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <select value={selectedPage} onChange={handlePageChange}
            style={{ padding: '4px 10px', borderRadius: 4, border: '1px solid #475569', background: '#334155', color: 'white', minWidth: 150, fontSize: 13 }}>
            <option value="">选择页面...</option>
            {pages.map(p => (<option key={p.id} value={p.id}>{p.title || p.slug} ({p.slug})</option>))}
          </select>
          <button onClick={handleSave} disabled={!selectedPage || saving}
            style={{ padding: '4px 16px', borderRadius: 4, border: 'none', background: selectedPage && !saving ? '#2563eb' : '#475569', color: 'white', fontSize: 13, cursor: selectedPage && !saving ? 'pointer' : 'not-allowed' }}>
            {saving ? '保存中...' : '保存页面'}
          </button>
        </div>
      </div>

      {/* Messages */}
      {error && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '6px 16px', fontSize: 13 }}>⚠️ {error}</div>}
      {loading && <div style={{ background: '#dbeafe', color: '#1e40af', padding: '6px 16px', fontSize: 13 }}>加载中...</div>}

      {/* Debug info */}
      {debug && (
        <div style={{ background: '#1e1e2e', color: '#a0f0a0', padding: '4px 12px', fontSize: 11, fontFamily: 'monospace', maxHeight: 80, overflow: 'auto', whiteSpace: 'pre' }}>
          {debug}
        </div>
      )}

      {/* Editor - with visible border so we can see if it rendered */}
      <div ref={containerRef} style={{ flex: 1, minHeight: 0, position: 'relative', zIndex: 1 }} />

      {/* Test element */}
      <div id="editor-test" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(45deg, #f0f0f0 25%, #e0e0e0 25%, #e0e0e0 50%, #f0f0f0 50%, #f0f0f0 75%, #e0e0e0 75%)', backgroundSize: '20px 20px', pointerEvents: 'none' }} />

      {/* Footer */}
      <div style={{ background: '#f1f5f9', color: '#64748b', fontSize: 11, padding: '3px 16px', flexShrink: 0, borderTop: '1px solid #e2e8f0' }}>
        ① 选择页面 → ② 左侧面板拖拽组件 → ③ 编辑 → ④ 保存
      </div>
    </div>
  );
}