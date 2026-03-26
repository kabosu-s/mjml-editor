// app/actions/sendEmail.ts
"use server"; // サーバーサイドで実行することを明示

import { Resend } from 'resend';

// サーバー起動時に環境変数からロードされる
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTestEmail(to: string, html: string) {
  // セキュリティチェック：キーがない場合は即エラー
  if (!process.env.RESEND_API_KEY) {
    return { success: false, error: "APIキーが設定されていません。" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [to],
      subject: '【Sae Forge】Mail Test',
      html: html,
    });

    if (error) {
      console.error(error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (e) {
    return { success: false, error: "通信エラーが発生しました" };
  }
}