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
</mjml>`,
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
</mj-section>`,
  },
  {
    name: '🔘 強調ボタン',
    id: 'cta_button',
    description: 'クリック率の高いデザイン',
    code: `<mj-button background-color="#f45e43" color="white" href="#" font-weight="bold" font-size="18px" border-radius="4px" inner-padding="15px 30px">
  詳しく見る（CTA）
</mj-button>`,
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
</mj-section>`,
  },
];
