import { Resend } from 'resend';

// 環境変数の存在チェック（ランタイムエラーを未然に防ぐ）
if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined in .env.local');
}

// インスタンスをエクスポート
export const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * 送信ログなどを共通化したい場合は、ここにラッパー関数を作る
 */
