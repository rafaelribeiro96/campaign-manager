import { readDataFromFile, writeDataToFile } from '../../services/fileUtils';
import verifyExpiredCampaigns from '../../services/verifyExpiredCampaigns';

jest.mock('../../services/fileUtils', () => ({
  readDataFromFile: jest.fn(),
  writeDataToFile: jest.fn(),
}));

describe('verificarCampanhasExpiradas', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
    console.error = jest.fn();
  });

  test('deve lidar com erros ao ler dados do arquivo', async () => {
    (readDataFromFile as jest.Mock).mockRejectedValue(new Error('Erro ao ler dados'));

    await verifyExpiredCampaigns();

    expect(console.error).toHaveBeenCalledWith('Erro ao verificar campanhas expiradas:', new Error('Erro ao ler dados'));
  });

  test('deve lidar com erros ao escrever dados no arquivo', async () => {
    const campaigns = [
      { id: 1, endDate: '2023-09-10', status: 'Ativa' },
    ];

    (readDataFromFile as jest.Mock).mockResolvedValue(campaigns);
    (writeDataToFile as jest.Mock).mockRejectedValue(new Error('Erro ao escrever dados'));

    await verifyExpiredCampaigns();

    expect(console.error).toHaveBeenCalledWith('Erro ao verificar campanhas expiradas:', new Error('Erro ao escrever dados'));
  });
});
