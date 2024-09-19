import React from 'react';
import { format, parseISO } from 'date-fns';
import Styles from './campaignCard.module.css';

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
      className={Styles.cardContainer}
      onClick={onClick}
      data-testid="card-container"
    >
      <div className={Styles.cardHeader}>
        <h3 className={Styles.cardTitle}>{campaign.name}</h3>
        <span className={`${Styles.status} ${Styles[campaign.status.toLowerCase()]}`}>
          {campaign.status}
        </span>
      </div>
      <div className={Styles.cardContent}>
        <p><strong>Início:</strong> {format(parseISO(campaign.startDate), 'dd/MM/yyyy')}</p>
        <p><strong>Fim:</strong> {format(parseISO(campaign.endDate), 'dd/MM/yyyy')}</p>
        <p><strong>Categoria:</strong> {campaign.category}</p>
        <p><strong>Criada em:</strong> {formattedCreatedAt}</p>
      </div>
    </div>
  );
};

export default CampaignCard;
