'use client'

import { useParams } from 'next/navigation';

export default function Page() {
  const { subject, chapter, slug } = useParams();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Subject: {subject}</h1>
      <h2 className="text-xl">Chapter: {chapter}</h2>
      <h3 className="text-lg">Subchapter: {slug}</h3>
    </div>
  );
}
