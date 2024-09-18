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
}

const CampaignList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCampaigns = async () => {
      const campaignsData = await getCampaigns();
      setCampaigns(campaignsData);
    };

    fetchCampaigns();
  }, []);

  const handleCampaignClick = (id: string) => {
    router.push(`/campaign/${id}`);
  };

  return (
    <div className={styles.campaignList}>
      {campaigns.length > 0 ? (
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
