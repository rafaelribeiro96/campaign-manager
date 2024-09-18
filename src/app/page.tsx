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
        <p>
          Gerencie suas campanhas de forma fácil e eficiente com nossa
          aplicação.
        </p>
      </header>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={() => handleNavigate('/campaign')}
        >
          Ver Campanhas
        </button>
        <button
          className={styles.button}
          onClick={() => handleNavigate('/campaign/new')}
        >
          Criar Nova Campanha
        </button>
      </div>
    </div>
  );
};

export default HomePage;
