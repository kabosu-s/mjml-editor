'use server';

import { resend } from '@/lib/resend';

export async function sendTestEmail(to: string, html: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [to],
      subject: '【Mail Test】',
      html: html,
    });

    if (error) {
      console.error(error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (e) {
    console.error('[Server Error]:', e);
    return { success: false, error: '送信プロセスで問題が発生しました' };
  }
}
