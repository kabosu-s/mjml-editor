# MAIL-FORGE v1.0

MAIL-FORGEは、MJMLを利用してレスポンシブなメールテンプレートを高速に作成・検証するためのエディタツールです。
Monaco Editorによる快適なコーディング環境と、Resendを利用したテスト送信機能を備えています。

## 主な機能

- **MJML リアルタイムプレビュー**: 左側でMJMLを編集すると、右側に即座にHTMLプレビューが表示されます。
- **スニペット機能**: よく使うレイアウトやボタン、フッターなどのコードをサイドバーからワンクリックで挿入できます。
- **テスト送信**: プレビュー中の内容をそのまま指定したメールアドレスに送信し、実機確認が可能です。
- **HTML エクスポート**: 作成したMJMLをHTMLとしてダウンロード、またはクリップボードにコピーできます。

## セットアップ

### 1. 環境変数の設定

プロジェクトのルートディレクトリに `.env.local` ファイルを作成し、ResendのAPIキーを設定してください。

```env
RESEND_API_KEY=re_your_api_key_here
```

### 2. インストールと起動

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

[http://localhost:3000](http://localhost:3000) にアクセスしてエディタを開きます。

### (オプション) 疎通確認スクリプト

APIキーが正しく設定されているか、CLIから直接確認できます。

```bash
node scripts/test-resend.mjs
```

## 使い方

1. **コーディング**: 左側のエディタにMJMLを記述します。
2. **スニペット活用**: 左サイドバーの「Snippets」からテンプレートパーツを選択すると、エディタのカーソル位置にコードが挿入されます。
3. **テスト送信**: ヘッダーにある入力欄に送信先メールアドレスを入力し、「Test Send」ボタンをクリックします。
   - ※ デフォルトでは `onboarding@resend.dev` から送信されます。
4. **HTMLの取得**: 右上の「Copy HTML」でクリップボードへ、「Download HTML」でファイルとして保存します。

## 技術スタック

- **Framework**: Next.js 16 (App Router)
- **Editor**: Monaco Editor (@monaco-editor/react)
- **Engine**: MJML (mjml-browser)
- **Email Service**: Resend
- **Styling**: Tailwind CSS

## 注意事項

- 現状、テスト送信の送信元は `onboarding@resend.dev` に固定されています。独自のドメインから送信する場合は `actions/send-email.ts` を修正してください。
