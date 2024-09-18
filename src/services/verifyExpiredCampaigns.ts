import { readDataFromFile, writeDataToFile } from './fileUtils';

const verifyExpiredCampaigns = async () => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const campaigns = await readDataFromFile();

    const updatedCampaigns = campaigns.map(campaign => {
      if (campaign.endDate < today && campaign.status !== 'expirada') {
        return { ...campaign, status: 'expirada' };
      }
      return campaign;
    });

    if (updatedCampaigns.some(campaign => campaign.status === 'expirada')) {
      await writeDataToFile(updatedCampaigns);
      console.log('Campanhas expiradas atualizadas com sucesso.');
    } else {
      console.log('Nenhuma campanha expirada encontrada.');
    }
  } catch (error) {
    console.error('Erro ao verificar campanhas expiradas:', error);
  }
};

export default verifyExpiredCampaigns;
