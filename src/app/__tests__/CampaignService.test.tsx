import { getCampaigns, getCampaignById, createCampaign, updateCampaign, deleteCampaign } from '../../services/campaignService';

global.fetch = jest.fn();

describe('Serviço de Campanhas', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test('getCampaigns - sucesso', async () => {
    const mockResponse = [{ id: '1', name: 'Campanha 1' }];
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const campaigns = await getCampaigns();
    expect(campaigns).toEqual(mockResponse);
  });

  test('getCampaigns - falha', async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: false });

    await expect(getCampaigns()).rejects.toThrow('Failed to fetch campaigns');
  });

  test('getCampaignById - sucesso', async () => {
    const mockResponse = { id: '1', name: 'Campanha 1' };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const campaign = await getCampaignById('1');
    expect(campaign).toEqual(mockResponse);
  });

  test('createCampaign - sucesso', async () => {
    const mockResponse = { id: '1', name: 'Nova Campanha' };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const data = { name: 'Nova Campanha', endDate: '2024-12-31' };
    const campaign = await createCampaign(data);
    expect(campaign).toEqual(mockResponse);
  });

  test('updateCampaign - sucesso', async () => {
    const mockResponse = { id: '1', name: 'Campanha Atualizada' };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const data = { name: 'Campanha Atualizada', endDate: '2024-12-31', status: 'Ativa' };
    const campaign = await updateCampaign('1', data);
    expect(campaign).toEqual(mockResponse);
  });

  test('deleteCampaign - sucesso', async () => {
    const mockResponse = { id: '1', name: 'Campanha Excluída' };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await deleteCampaign('1');
    expect(response).toEqual(mockResponse);
  });
});
