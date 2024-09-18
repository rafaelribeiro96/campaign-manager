import { readDataFromFile, writeDataToFile } from './fileUtils';

const verifyExpiredCampaigns = async () => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const campaigns = await readDataFromFile();

    const updatedCampaigns = campaigns.map(campaign => {
      if (campaign.endDate < today && campaign.status !== 'Expirada') {
        return { ...campaign, status: 'Expirada' };
      }
      return campaign;
    });

    if (updatedCampaigns.some(campaign => campaign.status === 'Expirada')) {
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
