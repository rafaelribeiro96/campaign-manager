import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CampaignList from '../campaign/CampaignList';
import { getCampaigns } from '../../services/campaignService';
import { getCategories } from '../../services/categoryService';
import { useRouter } from 'next/navigation';

jest.mock('../../services/campaignService');
jest.mock('../../services/categoryService');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CampaignList', () => {
  const mockCampaigns = [
    {
      id: '1',
      name: 'Campaign 1',
      status: 'Ativa',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      createdAt: '2023-01-01',
      category: 'Category 1',
    },
    {
      id: '2',
      name: 'Campaign 2',
      status: 'Pausada',
      startDate: '2023-01-01',
      endDate: '2023-06-30',
      createdAt: '2023-01-01',
      category: 'Category 2',
    },
  ];

  const mockCategories = [
    { name: 'Category 1' },
    { name: 'Category 2' },
  ];

  beforeEach(() => {
    (getCampaigns as jest.Mock).mockResolvedValue(mockCampaigns);
    (getCategories as jest.Mock).mockResolvedValue(mockCategories);
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders campaign list and filters correctly', async () => {
    render(<CampaignList />);

    expect(screen.getByText('Carregando campanhas...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Campaign 1')).toBeInTheDocument();
      expect(screen.getByText('Campaign 2')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Filtrar status:'), { target: { value: 'Ativa' } });
    fireEvent.click(screen.getByText('Filtrar'));

    await waitFor(() => {
      expect(screen.getByText('Campaign 1')).toBeInTheDocument();
      expect(screen.queryByText('Campaign 2')).not.toBeInTheDocument();
    });
  });

  test('handles pagination correctly', async () => {
    render(<CampaignList />);

    await waitFor(() => {
      expect(screen.getByText('Página 1 de 1')).toBeInTheDocument();
    });

    expect(screen.queryByText('Próxima')).toBeNull();
  });

  test('handles error when fetching campaigns', async () => {
    (getCampaigns as jest.Mock).mockRejectedValue(new Error('Error loading campaigns'));
    render(<CampaignList />);

    await waitFor(() => {
      expect(screen.getByText('Não foi possível carregar as campanhas.')).toBeInTheDocument();
    });
  });
});
