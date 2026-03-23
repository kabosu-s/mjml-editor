"use client";

import React, { useState, useEffect, useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import mjml2html from 'mjml-browser';


// --- 1. テンプレートデータの定義 ---
const MJML_TEMPLATES = [
  {
    name: '🍀 基本レイアウト',
    id: 'base_layout',
    description: 'メール全体のベースとなる構造',
    code: `<mjml>
  <mj-head>
    <mj-title>Sae Forge Mail</mj-title>
    <mj-attributes>
      <mj-all font-family="helvetica, sans-serif" color="#333333" />
      <mj-text font-size="16px" line-height="24px" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f4f4f4">
    <mj-section background-color="#ffffff" padding="20px">
      <mj-column>
        <mj-text font-size="24px" font-weight="bold">ここにタイトル</mj-text>
        <mj-divider border-color="#333" />
        <mj-text>ここに本文の最初のパラグラフを入力します。</mj-text>
      </mj-column>
    </mj-section>
    </mj-body>
</mjml>`
  },
  {
    name: '📝 2カラム記事（画像＋テキスト）',
    id: 'two_column',
    description: 'スパム対策向け、テキスト多め',
    code: `<mj-section background-color="#ffffff" padding="10px">
  <mj-column>
    <mj-image width="160px" src="https://via.placeholder.com/160" alt="記事の画像" padding="10px"/>
  </mj-column>
  <mj-column>
    <mj-text font-weight="bold" font-size="18px">記事タイトル（SEO/スパム意識）</mj-text>
    <mj-text font-size="14px">説明文がここに入ります。テキスト比率を稼ぐために、ある程度の文字数を用意しましょう。具体的な情報を盛り込むと到達率が上がります。</mj-text>
  </mj-column>
</mj-section>`
  },
  {
    name: '🔘 強調ボタン',
    id: 'cta_button',
    description: 'クリック率の高いデザイン',
    code: `<mj-button background-color="#f45e43" color="white" href="#" font-weight="bold" font-size="18px" border-radius="4px" inner-padding="15px 30px">
  詳しく見る（CTA）
</mj-button>`
  },
  {
    name: '🚫 フッター（特商法/配信停止）',
    id: 'footer',
    description: '必須情報。毎回書く手間をカット',
    code: `<mj-section background-color="#333333" padding="20px">
  <mj-column>
    <mj-text color="#ffffff" font-size="12px" align="center">
      株式会社◯◯◯◯ | 東京都世田谷区◯◯◯ <br/>
      このメールは配信希望された方にお送りしています。<br/>
      <a href="#" style="color:#ffffff; text-decoration:underline;">配信停止はこちら</a>
    </mj-text>
  </mj-column>
</mj-section>`
  }
];


export default function MjmlEditorPage() {
  const [mjml, setMjml] = useState(MJML_TEMPLATES[0].code); // 初期値は基本レイアウト
  const [html, setHtml] = useState('');
  const [error, setError] = useState<string | null>(null);
  

  // Monaco Editorのエディタインスタンスを保持するRef
  const editorRef = useRef<any>(null);

  // エディタのマウント時にインスタンスを取得
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  // --- 2. テンプレート挿入ロジック ---
  const insertTemplate = (code: string) => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const selection = editor.getSelection();
      
      // カーソル位置または選択範囲を取得
      const range = {
        startLineNumber: selection.startLineNumber,
        startColumn: selection.startColumn,
        endLineNumber: selection.endLineNumber,
        endColumn: selection.endColumn,
      };

      // executeEditsを使って、アンドゥ（Ctrl+Z）履歴を残しつつ挿入
      editor.executeEdits("my-source", [
        { range, text: code, forceMoveMarkers: true },
      ]);
      
      // 挿入後にエディタにフォーカスを戻す（連続挿入のため）
      editor.focus();
    }
  };

  // MJMLをHTMLに変換する処理
  useEffect(() => {
    try {
      const { html: convertedHtml, errors } = mjml2html(mjml, {
        beautify: true,
        minify: false,
      });
      if (errors.length > 0) {
        setError(errors[0].message);
      } else {
        setError(null);
        setHtml(convertedHtml);
      }
    } catch (e) {
      setError("変換エラーが発生しました");
    }
  }, [mjml]);

  // HTMLダウンロード機能
  const downloadHtml = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter_${new Date().getTime()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // クリップボードコピー
  const copyToClipboard = () => {
    navigator.clipboard.writeText(html);
    alert('HTMLをコピーしました。メーラーに貼り付けてね。');
  };

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-slate-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-700 p-4">
        <h1 className="text-xl font-bold tracking-tighter">MAIL-FORGE v1.0</h1>
        <div className="flex gap-2">
          <button onClick={copyToClipboard} className="rounded bg-slate-700 px-4 py-2 hover:bg-slate-600 transition">Copy HTML</button>
          <button onClick={downloadHtml} className="rounded bg-blue-600 px-4 py-2 hover:bg-blue-500 transition font-bold">Download HTML</button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* --- 3. テンプレート一覧サイドバー --- */}
        <aside className="w-64 border-r border-slate-700 bg-slate-800 p-3 overflow-y-auto">
          <h2 className="text-sm font-semibold text-slate-400 mb-3 tracking-widest uppercase">Snippets</h2>
          <div className="space-y-2">
            {MJML_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => insertTemplate(tmpl.code)}
                className="w-full text-left p-3 rounded-lg bg-slate-700 hover:bg-blue-900/50 border border-slate-600 hover:border-blue-700 transition group"
              >
                <div className="font-medium text-white group-hover:text-blue-300 transition text-sm">{tmpl.name}</div>
                <div className="text-xs text-slate-400 mt-1">{tmpl.description}</div>
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-6 px-1">カーソル位置に挿入されます。</p>
        </aside>
        {/* --- 4. エディタ & プレビュー Split View --- */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Editor (Monaco) */}
          <div className="w-1/2 border-r border-slate-700">
            <Editor
              height="100%"
              defaultLanguage="xml"
              theme="vs-dark"
              value={mjml}
              onMount={handleEditorDidMount} // インスタンス取得用
              onChange={(value) => setMjml(value || '')}
              options={{ minimap: { enabled: false }, fontSize: 13, wordWrap: 'on' }}
            />
          </div>

          {/* Right: Preview (iframe) */}
          <div className="w-1/2 bg-white relative">
            {error && (
              <div className="absolute top-0 left-0 right-0 bg-red-500/90 p-2 text-xs text-white z-10 font-mono">
                ⚠️ {error}
              </div>
            )}
            <iframe srcDoc={html} title="Preview" className="h-full w-full border-none" />
          </div>
        </div>
      </div>
    </main>
  );
}