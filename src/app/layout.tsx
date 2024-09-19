import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Gerenciador de Campanhas',
  description: 'Aplicação para gerenciar campanhas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <link rel="icon" href="/favicon.png" />
      <meta name="description" content="Aplicação para gerenciar campanhas" />
      <meta property="og:title" content="Gerenciador de Campanhas" />
      <meta property="og:description" content="Aplicação para gerenciar campanhas" />
      <meta http-equiv="Cache-Control" content="max-age=3600" />

      <body className={inter.className}>{children}</body>
    </html>
  );
}
