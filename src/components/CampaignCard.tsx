import React from "react";

type Campaign = {
  id: string;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
};

type CampaignCardProps = {
  campaign: Campaign;
  onClick?: () => void;
};

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onClick }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <h3>{campaign.name}</h3>
      <p>Status: {campaign.status}</p>
      <p>Início: {new Date(campaign.startDate).toLocaleDateString()}</p>
      <p>Fim: {new Date(campaign.endDate).toLocaleDateString()}</p>
    </div>
  );
};

export default CampaignCard;
