// src/services/__tests__/campaignService.test.ts
import { getCampaigns, getCampaignById, createCampaign, updateCampaign, deleteCampaign } from '../../services/campaignService';

global.fetch = jest.fn();

describe('Campaign Service', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test('getCampaigns - success', async () => {
    const mockResponse = [{ id: '1', name: 'Campaign 1' }];
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const campaigns = await getCampaigns();
    expect(campaigns).toEqual(mockResponse);
  });

  test('getCampaigns - failure', async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: false });

    await expect(getCampaigns()).rejects.toThrow('Failed to fetch campaigns');
  });

  test('getCampaignById - success', async () => {
    const mockResponse = { id: '1', name: 'Campaign 1' };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const campaign = await getCampaignById('1');
    expect(campaign).toEqual(mockResponse);
  });

  test('createCampaign - success', async () => {
    const mockResponse = { id: '1', name: 'New Campaign' };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const data = { name: 'New Campaign', endDate: '2024-12-31' };
    const campaign = await createCampaign(data);
    expect(campaign).toEqual(mockResponse);
  });

  test('updateCampaign - success', async () => {
    const mockResponse = { id: '1', name: 'Updated Campaign' };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const data = { name: 'Updated Campaign', endDate: '2024-12-31', status: 'Ativa' };
    const campaign = await updateCampaign('1', data);
    expect(campaign).toEqual(mockResponse);
  });

  test('deleteCampaign - success', async () => {
    const mockResponse = { id: '1', name: 'Deleted Campaign' };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await deleteCampaign('1');
    expect(response).toEqual(mockResponse);
  });
});
