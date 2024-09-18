'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import CampaignList from './CampaignList';
import styles from './campaign.module.css';

const CampaignPage: React.FC = () => {
  const router = useRouter();

  const handleNewCampaignClick = () => {
    router.push('/campaign/new');
  };

  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Campanhas</h1>
          <button
            className={styles.newCampaignButton}
            onClick={handleNewCampaignClick}
          >
            Criar Nova Campanha
          </button>
          <button className={styles.backButton} onClick={handleBackClick}>
            Voltar para Home
          </button>
        </div>
        <CampaignList />
      </div>
    </Layout>
  );
};

export default CampaignPage;
