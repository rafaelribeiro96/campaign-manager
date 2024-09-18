import React from 'react';
import { format, parseISO } from 'date-fns';

type Campaign = {
  id: string;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  createdAt?: string;
  category: string;
};

type CampaignCardProps = {
  campaign: Campaign;
  onClick?: () => void;
};

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onClick }) => {
  const formattedCreatedAt = campaign.createdAt
    ? format(parseISO(campaign.createdAt), 'dd/MM/yyyy HH:mm')
    : 'Data não disponível';

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '10px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <h3>{campaign.name}</h3>
      <p>Status: {campaign.status}</p>
      <p>Início: {format(parseISO(campaign.startDate), 'dd/MM/yyyy')}</p>
      <p>Fim: {format(parseISO(campaign.endDate), 'dd/MM/yyyy')}</p>
      <p>Criado em: {formattedCreatedAt}</p>
      <p>Categoria: {campaign.category}</p>
    </div>
  );
};

export default CampaignCard;
