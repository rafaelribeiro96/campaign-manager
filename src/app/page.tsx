'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/campaign');
  }, [router]);

  return (
    <div>
      <p>Redirecionando para a lista de campanhas...</p>
    </div>
  );
}
