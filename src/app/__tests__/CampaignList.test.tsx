import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
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

describe('Lista de Campanhas', () => {
  const mockCampaigns = [
    {
      id: '1',
      name: 'Campanha 1',
      status: 'Ativa',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      createdAt: '2023-01-01',
      category: 'Categoria 1',
    },
    {
      id: '2',
      name: 'Campanha 2',
      status: 'Pausada',
      startDate: '2023-01-01',
      endDate: '2023-06-30',
      createdAt: '2023-01-01',
      category: 'Categoria 2',
    },
  ];

  const mockCategories = [
    { name: 'Categoria 1' },
    { name: 'Categoria 2' },
  ];

  beforeEach(() => {
    (getCampaigns as jest.Mock).mockResolvedValue(mockCampaigns);
    (getCategories as jest.Mock).mockResolvedValue(mockCategories);
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza a lista de campanhas e filtros corretamente', async () => {
    await act(async () => {
      render(<CampaignList />);
    });

    await waitFor(() => {
      expect(screen.getByText('Campanha 1')).toBeInTheDocument();
      expect(screen.getByText('Campanha 2')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Filtrar status:'), { target: { value: 'Ativa' } });
    fireEvent.click(screen.getByText('Filtrar'));

    await waitFor(() => {
      expect(screen.getByText('Campanha 1')).toBeInTheDocument();
      expect(screen.queryByText('Campanha 2')).not.toBeInTheDocument();
    });
  });

  test('lida com a paginação corretamente', async () => {
    await act(async () => {
      render(<CampaignList />);
    });

    await waitFor(() => {
      expect(screen.getByText('Página 1 de 1')).toBeInTheDocument();
    });

    expect(screen.queryByText('Próxima')).toBeNull();
  });

  test('lida com erro ao buscar campanhas', async () => {
    (getCampaigns as jest.Mock).mockRejectedValue(new Error('Erro ao carregar campanhas'));

    await act(async () => {
      render(<CampaignList />);
    });

    await waitFor(() => {
      expect(screen.getByText('Não foi possível carregar as campanhas.')).toBeInTheDocument();
    });
  });
});
