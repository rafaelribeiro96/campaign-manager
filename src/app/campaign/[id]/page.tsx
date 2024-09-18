"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  getCampaignById,
  updateCampaign,
} from "../../../services/campaignService";
import Layout from "../../../components/Layout";

const CampaignDetails: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [campaign, setCampaign] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const data = await getCampaignById(id as string);
        setCampaign(data);
      };
      fetchData();
    }
  }, [id]);

  const handleUpdate = async () => {
    await updateCampaign(campaign.id, campaign);
    router.push("/campaign");
  };

  if (!campaign) return <div>Carregando...</div>;

  return (
    <Layout>
      <h2>{campaign.name}</h2>
      <p>Status: {campaign.status}</p>
      <p>Início: {new Date(campaign.startDate).toLocaleDateString()}</p>
      <p>Fim: {new Date(campaign.endDate).toLocaleDateString()}</p>
      <button onClick={handleUpdate}>Salvar Alterações</button>
    </Layout>
  );
};

export default CampaignDetails;
