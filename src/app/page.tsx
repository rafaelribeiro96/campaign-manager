'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import styles from './page.module.css';
import { GitHub, Instagram, LinkedIn, Twitter } from '@mui/icons-material';

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const checkExpiredCampaigns = async () => {
      try {
        const response = await fetch('/api/verifyExpiredCampaigns');
        const result = await response.json();
      } catch (error) {
        console.error('Erro ao verificar campanhas expiradas:', error);
      }
    };

    checkExpiredCampaigns();
  }, []);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLinks}>
          <div className={styles.logoContainer}>
            <img src="/images/logoawsales.avif" alt="Logo" className={styles.logo} />
          </div>
          <div className={styles.socialLinks}>
            <a href="https://www.linkedin.com/in/rafaelfeliperibeiro/" className={styles.socialLink}><LinkedIn /></a>
            <a href="https://github.com/rafaelribeiro96" className={styles.socialLink}><GitHub /></a>
            <a href="https://rafaelribeiro96.github.io/" className={styles.socialLink}><Instagram /></a>
          </div>
        </div>
        <div className={styles.titleContainer}>
          <h1>Bem-vindo ao Gestor de Campanhas</h1>
          <p>Gerencie suas campanhas de forma fácil e eficiente com nossa aplicação.</p>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => handleNavigate('/campaign')}>
            Gerenciar Campanhas
          </button>
        </div>
      </header>
      <img src="/images/bannersite.avif" alt="Campaign Manager Banner" className={styles.bannerImage} />
      <section className={styles.highlights}>
        <div className={styles.highlightItem}>
          <h2>Fácil de Usar</h2>
          <p>Uma interface intuitiva para gerenciar suas campanhas sem complicações.</p>
        </div>
        <div className={styles.highlightItem}>
          <h2>Relatórios Detalhados</h2>
          <p>Obtenha relatórios detalhados sobre o desempenho das suas campanhas.</p>
        </div>
        <div className={styles.highlightItem}>
          <h2>Suporte Dedicado</h2>
          <p>Nosso suporte está sempre disponível para ajudar com suas necessidades.</p>
        </div>
      </section>
      <section className={styles.testimonials}>
        <h2>O que nossos usuários dizem</h2>
        <div className={styles.testimonialItem}>
          <blockquote>
            <p>"Uma ferramenta essencial para nossa equipe de marketing. Muito fácil de usar!"</p>
            <footer>- João Silva, Marketing Manager</footer>
          </blockquote>
        </div>
        <div className={styles.testimonialItem}>
          <blockquote>
            <p>"Excelente plataforma com ótimos recursos para gerenciar campanhas."</p>
            <footer>- Maria Oliveira, CEO</footer>
          </blockquote>
        </div>
      </section>
      <footer className={styles.footer}>
        <p>&copy; 2024 Gerenciamento de Campanhas. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
