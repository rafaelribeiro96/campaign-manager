'use client';

import React, { useEffect, useState } from 'react';
import CampaignCard from '../../components/CampaignCard';
import { getCampaigns } from '../../services/campaignService';
import { useRouter } from 'next/navigation';
import styles from './campaign.module.css';

interface Campaign {
  id: string;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  category: string;
}

const CampaignList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const campaignsData = await getCampaigns();
        setCampaigns(campaignsData);
      } catch (err) {
        setError('Não foi possível carregar as campanhas.');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);


  const handleCampaignClick = (id: string) => {
    router.push(`/campaign/${id}`);
  };

  return (
    <div className={styles.campaignList}>
      {loading ? (
        <p>Carregando campanhas...</p>
      ) : error ? (
        <p>{error}</p>
      ) : campaigns.length > 0 ? (
        campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onClick={() => handleCampaignClick(campaign.id)}
          />
        ))
      ) : (
        <p>Nenhuma campanha disponível.</p>
      )}
    </div>
  );
};

export default CampaignList;
