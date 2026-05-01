'use client';

import { useState, useEffect } from 'react';
import EditorComp from '@grapesjs/react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import type { Editor } from 'grapesjs';

export default function VisualEditorPage() {
  const [selectedPage, setSelectedPage] = useState('');
  const [pages, setPages] = useState<{ id: string; slug: string; title: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editorReady, setEditorReady] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/pages');
      const data = await res.json();
      if (data.success) setPages(data.data);
    } catch { setError('获取页面列表失败'); }
  };

  const handleEditorReady = (editor: Editor) => {
    (window as any).__gjsEditor = editor;
    setEditorReady(true);

    // Register custom blocks
    [
      { id: 'text', label: '文本', content: '<div style="padding:15px;font-size:15px;">编辑这段文本</div>', category: '内容' },
      { id: 'heading1', label: '大标题', content: '<h1 style="padding:15px;font-size:32px;font-weight:bold;">大标题</h1>', category: '内容' },
      { id: 'heading2', label: '中标题', content: '<h2 style="padding:15px;font-size:24px;font-weight:bold;">中标题</h2>', category: '内容' },
      { id: 'image', label: '图片', content: '<div style="padding:20px;text-align:center;"><img src="https://placehold.co/560x400/eee/999?text=添加图片" style="max-width:100%;border-radius:4px;" /></div>', category: '内容' },
      { id: 'button', label: '按钮', content: '<div style="padding:15px;"><a href="#" style="display:inline-block;padding:10px 30px;background:#1e3a5f;color:white;text-decoration:none;border-radius:6px;">了解更多</a></div>', category: '内容' },
      { id: 'section', label: '通栏区块', content: '<section style="padding:60px 20px;background:#f9f9f9;"><div style="max-width:1200px;margin:0 auto;">区块内容</div></section>', category: '布局' },
      { id: 'two-cols', label: '两列', content: '<div style="display:flex;gap:24px;padding:20px;"><div style="flex:1;padding:20px;background:#f5f5f5;">左列</div><div style="flex:1;padding:20px;background:#f0f0f0;">右列</div></div>', category: '布局' },
      { id: 'three-cols', label: '三列', content: '<div style="display:flex;gap:20px;padding:20px;"><div style="flex:1;padding:15px;background:#f5f5f5;">列1</div><div style="flex:1;padding:15px;background:#f0f0f0;">列2</div><div style="flex:1;padding:15px;background:#ebebeb;">列3</div></div>', category: '布局' },
      { id: 'divider', label: '分割线', content: '<hr style="border:none;border-top:1px solid #ddd;margin:20px 0;" />', category: '内容' },
      { id: 'spacer', label: '空白间距', content: '<div style="height:40px;"></div>', category: '布局' },
    ].forEach(({ id, label, content, category }) => {
      editor.Blocks.add(id, { label, content, category });
    });
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pageId = e.target.value;
    setSelectedPage(pageId);
    if (!pageId) return;

    const editor = (window as any).__gjsEditor as Editor;
    if (!editor) return;

    setLoading(true);
    const loadPage = async () => {
      try {
        const res = await fetch(`/api/pages/${pageId}`);
        const data = await res.json();
        if (!data.success) throw Error();

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
            '<div style="text-align:center;padding:100px 20px;">' +
            '<h1 style="font-size:36px;color:#333">空白页面</h1>' +
            '<p style="color:#999;font-size:16px">从左侧面板拖拽组件开始编辑</p></div>'
          );
          editor.setStyle('');
        }
      } catch { setError('加载页面失败'); }
      finally { setLoading(false); }
    };
    loadPage();
  };

  const handleSave = async () => {
    if (!selectedPage) return;
    const editor = (window as any).__gjsEditor as Editor;
    if (!editor) return;

    setSaving(true);
    try {
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
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

      {/* Editor */}
      {!editorReady && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 36, height: 36, border: '3px solid #e5e7eb', borderTopColor: '#2563eb', borderRadius: '50%', margin: '0 auto 12px' }} />
            <p style={{ color: '#6b7280', margin: 0, fontSize: 14 }}>编辑器加载中...</p>
          </div>
        </div>
      )}

      <div style={{ flex: 1, minHeight: 0, display: editorReady ? 'block' : 'none' }}>
        <EditorComp
          grapesjs={grapesjs}
          options={{
            height: 'calc(100vh - 100px)',
            storageManager: false,
            noticeOnUnload: false,
          }}
          onEditor={handleEditorReady}
        />
      </div>
    </div>
  );
}