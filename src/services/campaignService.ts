const campaignsMock = [
  {
    id: "1",
    name: "Campanha de Verão",
    status: "ativa",
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-01-31T23:59:59Z",
  },
  {
    id: "2",
    name: "Campanha de Inverno",
    status: "expirada",
    startDate: "2023-06-01T00:00:00Z",
    endDate: "2023-06-30T23:59:59Z",
  },
  {
    id: "3",
    name: "Campanha de Outono",
    status: "ativa",
    startDate: "2023-09-01T00:00:00Z",
    endDate: "2023-09-30T23:59:59Z",
  },
  {
    id: "4",
    name: "Campanha de Primavera",
    status: "ativa",
    startDate: "2023-12-01T00:00:00Z",
    endDate: "2023-12-31T23:59:59Z",
  },
];

export const getCampaigns = async () => {
  return campaignsMock;
};

export const getCampaignById = async (id: string) => {
  return campaignsMock.find((campaign) => campaign.id === id);
};

export const updateCampaign = async (id: string, data: any) => {
  const index = campaignsMock.findIndex((campaign) => campaign.id === id);
  if (index !== -1) {
    campaignsMock[index] = { ...campaignsMock[index], ...data };
  }
  return campaignsMock[index];
};
