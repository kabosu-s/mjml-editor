// app/page.tsx
"use client";

import dynamic from 'next/dynamic';

// ssr: false を指定することで、ブラウザに到達してから初めて読み込まれる
const MjmlEditor = dynamic(() => import('../components/MjmlEditor'), {
  ssr: false,
  loading: () => <div className="h-screen bg-slate-900 flex items-center justify-center text-white">Loading Editor...</div>
});

export default function Page() {
  return <MjmlEditor />;
}