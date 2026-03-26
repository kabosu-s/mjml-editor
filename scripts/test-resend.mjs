// test-resend.mjs
import { Resend } from 'resend';
import dotenv from 'dotenv';

// .env.local から環境変数を読み込む
dotenv.config({ path: '.env.local' });

const resend = new Resend(process.env.RESEND_API_KEY);

async function runTest() {
  console.log('🚀 テスト送信を開始します...');

  if (!process.env.RESEND_API_KEY) {
    console.error('❌ エラー: RESEND_API_KEY が .env.local に見当たりません。');
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Sae Forge <onboarding@resend.dev>',
      to: ['hoge@example.com'], //resendに登録したメールアドレスにする
      subject: '🧪 Mail-Forge Connectivity Test',
      html: `
        <h1>Connection Success!</h1>
        <p>テストスクリプトからの送信に成功したよ。</p>
        <p>Time: ${new Date().toLocaleString('ja-JP')}</p>
        <hr />
        <small>Sent via Resend API</small>
      `,
    });

    if (error) {
      console.error('❌ Resend APIからエラーが返されました:', error);
    } else {
      console.log('✅ 送信成功！ ID:', data.id);
      console.log('📥 受信ボックス（または迷惑メールフォルダ）を確認してね。');
    }
  } catch (err) {
    console.error('💥 通信中に致命的なエラーが発生しました:', err);
  }
}

runTest();
