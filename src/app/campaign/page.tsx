'use client';

import React from 'react';
import Layout from '../../components/Layout';
import CampaignList from './CampaignList';
import { useRouter } from 'next/navigation';

const CampaignPage: React.FC = () => {
  const router = useRouter();

  const handleNewCampaignClick = () => {
    router.push('/campaign/new');
  };

  return (
    <Layout>
      <button onClick={handleNewCampaignClick}>Criar Nova Campanha</button>
      <CampaignList />
    </Layout>
  );
};

export default CampaignPage;
