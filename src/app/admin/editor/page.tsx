'use client';

import { useState, useEffect } from 'react';
import EditorComp from '@grapesjs/react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import type { Editor } from 'grapesjs';

// 设置 GrapesJS 中文界面
grapesjs.plugins.add('gjs-preset-webpage', (editor: any) => {
  const panelManager = editor.Panels;
  panelManager.getPanel('options')?.set('buttons', []);
  
  // 翻译主要面板标签
  const lm = editor.Panels.getPanel('layers');
  if (lm) {
    lm.set('title', '图层');
  }
});

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

    // 注册中文自定义块
    const blocks = [
      {
        id: 'text',
        label: '📝 文本',
        content: '<div style="padding:15px;font-size:16px;line-height:1.6;">双击编辑这段文本内容，输入您想要展示的文字信息。</div>',
        category: '基础组件'
      },
      {
        id: 'heading1',
        label: '🏷️ 一级标题',
        content: '<h1 style="padding:15px 20px;font-size:36px;font-weight:bold;color:#1e3a8a;">页面主标题</h1>',
        category: '基础组件'
      },
      {
        id: 'heading2',
        label: '🏷️ 二级标题',
        content: '<h2 style="padding:12px 20px;font-size:26px;font-weight:600;color:#333;">章节标题</h2>',
        category: '基础组件'
      },
      {
        id: 'image',
        label: '🖼️ 图片',
        content: '<div style="padding:20px;text-align:center;"><img src="https://placehold.co/800x400/1e3a8a/white?text=请上传您的图片" style="max-width:100%;height:auto;border-radius:8px;" alt="产品图片" /></div>',
        category: '基础组件'
      },
      {
        id: 'button',
        label: '🔘 按钮',
        content: '<div style="padding:15px;text-align:center;"><a href="#" style="display:inline-block;padding:12px 36px;background:#1e3a8a;color:white;text-decoration:none;border-radius:8px;font-weight:600;font-size:16px;">点击这里</a></div>',
        category: '基础组件'
      },
      {
        id: 'image-with-text',
        label: '🖼️ 图片+文字',
        content: '<div style="display:flex;gap:24px;padding:20px;align-items:center;"><div style="flex:1;"><img src="https://placehold.co/400x300/e5e7eb/666?text=图片" style="width:100%;border-radius:8px;" /></div><div style="flex:1;padding:20px;"><h3 style="font-size:22px;font-weight:600;margin:0 0 12px;">标题文字</h3><p style="color:#666;font-size:15px;line-height:1.6;margin:0;">这里是产品描述文字，可以详细介绍产品特点或服务内容。</p></div></div>',
        category: '基础组件'
      },
      {
        id: 'section',
        label: '📐 通栏区块',
        content: '<section style="padding:60px 20px;background:#f9fafb;"><div style="max-width:1200px;margin:0 auto;text-align:center;"><h2 style="font-size:28px;font-weight:bold;margin:0 0 20px;">区块标题</h2><p style="color:#666;font-size:16px;">区块内容区域，可以放置文本、图片等内容</p></div></section>',
        category: '布局组件'
      },
      {
        id: 'two-cols',
        label: '⬅️➡️ 两列布局',
        content: '<div style="display:flex;gap:24px;padding:20px;"><div style="flex:1;padding:30px;background:#f5f5f5;border-radius:8px;text-align:center;"><h4 style="margin:0 0 10px;font-size:18px;">左列内容</h4><p style="color:#888;margin:0;font-size:14px;">输入左侧内容</p></div><div style="flex:1;padding:30px;background:#f0f0f0;border-radius:8px;text-align:center;"><h4 style="margin:0 0 10px;font-size:18px;">右列内容</h4><p style="color:#888;margin:0;font-size:14px;">输入右侧内容</p></div></div>',
        category: '布局组件'
      },
      {
        id: 'three-cols',
        label: '3️⃣ 三列布局',
        content: '<div style="display:flex;gap:20px;padding:20px;"><div style="flex:1;padding:24px;background:#f5f5f5;border-radius:8px;text-align:center;"><div style="font-size:32px;margin-bottom:12px;">🏭</div><h4 style="margin:0 0 8px;font-size:16px;font-weight:600;">优势一</h4><p style="color:#888;margin:0;font-size:13px;">优势说明文字</p></div><div style="flex:1;padding:24px;background:#f0f0f0;border-radius:8px;text-align:center;"><div style="font-size:32px;margin-bottom:12px;">🎨</div><h4 style="margin:0 0 8px;font-size:16px;font-weight:600;">优势二</h4><p style="color:#888;margin:0;font-size:13px;">优势说明文字</p></div><div style="flex:1;padding:24px;background:#ebebeb;border-radius:8px;text-align:center;"><div style="font-size:32px;margin-bottom:12px;">🚢</div><h4 style="margin:0 0 8px;font-size:16px;font-weight:600;">优势三</h4><p style="color:#888;margin:0;font-size:13px;">优势说明文字</p></div></div>',
        category: '布局组件'
      },
      {
        id: 'divider',
        label: '➖ 分割线',
        content: '<hr style="border:none;border-top:2px solid #e5e7eb;margin:30px 0;" />',
        category: '基础组件'
      },
      {
        id: 'spacer',
        label: '↕️ 空白间距',
        content: '<div style="height:40px;"></div>',
        category: '布局组件'
      },
      {
        id: 'icon-box',
        label: '⭐ 图标+文字',
        content: '<div style="display:flex;flex-direction:column;align-items:center;padding:30px 20px;text-align:center;"><div style="font-size:48px;margin-bottom:16px;">🏭</div><h3 style="font-size:18px;font-weight:600;margin:0 0 8px;">工厂直供</h3><p style="color:#888;font-size:14px;margin:0;">无中间商，价格有竞争力</p></div>',
        category: '基础组件'
      },
      {
        id: 'cta-section',
        label: '📢 行动号召',
        content: '<section style="padding:60px 20px;background:#1e3a8a;color:white;text-align:center;"><h2 style="font-size:30px;font-weight:bold;margin:0 0 16px;">准备好开始了吗？</h2><p style="color:#93c5fd;margin:0 0 32px;font-size:18px;">立即联系我们，获取免费报价</p><a href="/contact" style="display:inline-block;padding:14px 40px;background:white;color:#1e3a8a;border-radius:8px;font-weight:600;text-decoration:none;font-size:16px;">立即联系</a></section>',
        category: '布局组件'
      },
    ];

    blocks.forEach(({ id, label, content, category }) => {
      editor.Blocks.add(id, { label, content, category });
    });

    // 自定义块面板名称
    const blockManager = editor.BlockManager;
    if (blockManager.getCategories) {
      blockManager.getCategories().forEach((cat: any) => {
        if (cat.id === 'basic') cat.set('label', '基础组件');
        else if (cat.id === 'text') cat.set('label', '文本');
        else if (cat.id === 'layout') cat.set('label', '布局');
      });
    }

    // 中文化完成
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
      if (result.success) {
        alert('✅ 页面保存成功！');
      } else {
        throw Error();
      }
    } catch { setError('保存失败，请重试'); }
    finally { setSaving(false); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* 顶部工具栏 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', background: '#1e293b', color: 'white', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>🎨 Sunfurns 可视化编辑器</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <select
            value={selectedPage}
            onChange={handlePageChange}
            style={{ padding: '5px 10px', borderRadius: 4, border: '1px solid #475569', background: '#334155', color: 'white', minWidth: 180, fontSize: 13 }}
          >
            <option value="">— 选择要编辑的页面 —</option>
            {pages.map(p => (
              <option key={p.id} value={p.id}>
                {p.title || p.slug} ({p.slug})
              </option>
            ))}
          </select>
          <button
            onClick={handleSave}
            disabled={!selectedPage || saving}
            style={{
              padding: '5px 18px',
              borderRadius: 4,
              border: 'none',
              background: selectedPage && !saving ? '#2563eb' : '#475569',
              color: 'white',
              fontSize: 13,
              cursor: selectedPage && !saving ? 'pointer' : 'not-allowed',
              fontWeight: 500,
            }}
          >
            {saving ? '⏳ 保存中...' : '💾 保存页面'}
          </button>
        </div>
      </div>

      {/* 提示信息 */}
      {error && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '8px 16px', fontSize: 13 }}>
          ⚠️ {error}
        </div>
      )}
      {loading && (
        <div style={{ background: '#dbeafe', color: '#1e40af', padding: '8px 16px', fontSize: 13 }}>
          ⏳ 正在加载页面内容...
        </div>
      )}

      {/* 编辑器加载中 */}
      {!editorReady && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 40, height: 40, border: '3px solid #e5e7eb', borderTopColor: '#2563eb', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#6b7280', margin: 0, fontSize: 14 }}>编辑器加载中，请稍候...</p>
            <p style={{ color: '#9ca3af', margin: '8px 0 0', fontSize: 12 }}>首次加载可能需要几秒钟</p>
          </div>
        </div>
      )}

      {/* 编辑器主体 */}
      <div style={{ flex: 1, minHeight: 0, display: editorReady ? 'block' : 'none' }}>
        <EditorComp
          grapesjs={grapesjs}
          options={{
            height: 'calc(100vh - 90px)',
            storageManager: false,
            noticeOnUnload: false,
            blockManager: {
              appendTo: '#blocks',
            },
            layerManager: {
              appendTo: '#layers',
            },
            styleManager: {
              appendTo: '#styles',
            },
            traitManager: {
              appendTo: '#traits',
            },
          }}
          onEditor={handleEditorReady}
        />

        {/* 底部帮助信息 */}
        <div style={{ position: 'fixed', bottom: 8, right: 16, background: 'rgba(30,41,59,0.9)', color: '#94a3b8', padding: '6px 14px', borderRadius: 6, fontSize: 12 }}>
          💡 提示：从左侧拖拽组件到画布中即可添加 | 点击元素可编辑属性 | 保存前请先选择页面
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        /* GrapesJS 默认面板标题翻译 */
        .gjs-block-categories {
          font-family: system-ui, -apple-system, sans-serif;
        }
      `}</style>
    </div>
  );
}