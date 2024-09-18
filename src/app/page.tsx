'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import styles from './page.module.css';

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const checkExpiredCampaigns = async () => {
      try {
        const response = await fetch('/api/verifyExpiredCampaigns');
        const result = await response.json();
        console.log(result.message || result.error);
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
        <h1>Bem-vindo ao Gerenciador de Campanhas</h1>
        <p>Gerencie suas campanhas de forma fácil e eficiente com nossa aplicação.</p>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => handleNavigate('/campaign')}>
            Gerenciar Campanhas
          </button>
          {/* <button className={styles.button} onClick={() => handleNavigate('/campaign/new')}>
            Criar Nova Campanha
          </button> */}
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

    </div>
  );
};

export default HomePage;
