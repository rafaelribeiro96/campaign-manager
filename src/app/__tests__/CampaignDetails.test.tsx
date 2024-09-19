import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import CampaignDetails from '../campaign/[id]/page';
import { getCampaignById, updateCampaign, deleteCampaign } from '../../services/campaignService';
import { getCategories } from '../../services/categoryService';
import { useRouter, useParams } from 'next/navigation';

jest.mock('../../services/campaignService');
jest.mock('../../services/categoryService');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

describe('Detalhes da Campanha', () => {
  const mockRouter = { push: jest.fn() };
  const mockParams = { id: '1' };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useParams as jest.Mock).mockReturnValue(mockParams);
  });

  test('renderiza detalhes da campanha após carregamento', async () => {
    (getCampaignById as jest.Mock).mockResolvedValue({
      id: '1',
      name: 'Campanha Teste',
      status: 'Ativa',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      category: 'Categoria Teste',
    });
    (getCategories as jest.Mock).mockResolvedValue([
      { id: 1, name: 'Categoria Teste' },
    ]);

    await act(async () => {
      render(<CampaignDetails />);
    });

    await waitFor(() => {
      expect(screen.getByLabelText('Nome:')).toHaveValue('Campanha Teste');
      expect(screen.getByLabelText('Status:')).toHaveValue('Ativa');
      expect(screen.getByLabelText('Data de Início:')).toHaveValue('2024-01-01');
      expect(screen.getByLabelText('Data de Fim:')).toHaveValue('2024-12-31');
      expect(screen.getByLabelText('Categoria:')).toHaveValue('Categoria Teste');
    });
  });

  test('permite editar e salvar campanha', async () => {
    (getCampaignById as jest.Mock).mockResolvedValue({
      id: '1',
      name: 'Campanha Teste',
      status: 'Ativa',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      category: 'Categoria Teste',
    });
    (getCategories as jest.Mock).mockResolvedValue([
      { id: 1, name: 'Categoria Teste' },
    ]);
    (updateCampaign as jest.Mock).mockResolvedValue({});

    await act(async () => {
      render(<CampaignDetails />);
    });

    await waitFor(async () => {
      fireEvent.click(screen.getByLabelText('Editar'));
      fireEvent.change(screen.getByLabelText('Nome:'), { target: { value: 'Campanha Editada' } });
      fireEvent.click(screen.getByLabelText('Salvar'));

      await waitFor(() => {
        expect(updateCampaign).toHaveBeenCalledWith('1', {
          id: '1',
          name: 'Campanha Editada',
          status: 'Ativa',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          category: 'Categoria Teste',
        });
      });
    });
  });

  test('permite excluir uma campanha', async () => {
    (getCampaignById as jest.Mock).mockResolvedValue({
      id: '1',
      name: 'Campanha Teste',
      status: 'Ativa',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      category: 'Categoria Teste',
    });
    (getCategories as jest.Mock).mockResolvedValue([
      { id: 1, name: 'Categoria Teste' },
    ]);
    (deleteCampaign as jest.Mock).mockResolvedValue({});

    await act(async () => {
      render(<CampaignDetails />);
    });

    await waitFor(async () => {
      fireEvent.click(screen.getByLabelText('Excluir'));
      await waitFor(() => {
        expect(deleteCampaign).toHaveBeenCalledWith('1');
        expect(mockRouter.push).toHaveBeenCalledWith('/campaign');
      });
    });
  });

  test('permite alternar entre modos de edição e visualização', async () => {
    (getCampaignById as jest.Mock).mockResolvedValue({
      id: '1',
      name: 'Campanha Teste',
      status: 'Ativa',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      category: 'Categoria Teste',
    });
    (getCategories as jest.Mock).mockResolvedValue([
      { id: 1, name: 'Categoria Teste' },
    ]);

    await act(async () => {
      render(<CampaignDetails />);
    });

    await waitFor(async () => {
      fireEvent.click(screen.getByLabelText('Editar'));
      expect(screen.getByLabelText('Nome:')).not.toBeDisabled();
      fireEvent.click(screen.getByLabelText('Cancelar'));
      expect(screen.getByLabelText('Nome:')).toBeDisabled();
    });
  });

  test('lida corretamente com a funcionalidade de pausar e retomar', async () => {
    (getCampaignById as jest.Mock).mockResolvedValue({
      id: '1',
      name: 'Campanha Teste',
      status: 'Ativa',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      category: 'Categoria Teste',
    });
    (getCategories as jest.Mock).mockResolvedValue([
      { id: 1, name: 'Categoria Teste' },
    ]);
    (updateCampaign as jest.Mock).mockResolvedValue({});

    await act(async () => {
      render(<CampaignDetails />);
    });

    await waitFor(async () => {
      fireEvent.click(screen.getByLabelText('Pausar'));
      await waitFor(() => {
        expect(updateCampaign).toHaveBeenCalledWith('1', {
          id: '1',
          name: 'Campanha Teste',
          status: 'Pausada',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          category: 'Categoria Teste',
        });
      });

      fireEvent.click(screen.getByLabelText('Retomar'));
      await waitFor(() => {
        expect(updateCampaign).toHaveBeenCalledWith('1', {
          id: '1',
          name: 'Campanha Teste',
          status: 'Ativa',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          category: 'Categoria Teste',
        });
      });
    });
  });
});
