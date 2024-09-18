'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import CampaignList from './CampaignList';
import styles from './campaign.module.css';
import { ArrowBack } from '@mui/icons-material';

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
          <button
            className={styles.newCampaignButton}
            onClick={handleNewCampaignClick}
          >
            Nova Campanha
          </button>
        </div>
        <CampaignList />
      </div>
    </Layout>
  );
};

export default CampaignPage;
