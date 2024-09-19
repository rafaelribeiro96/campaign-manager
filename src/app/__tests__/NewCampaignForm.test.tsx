import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import NewCampaignForm from '../campaign/new/page';
import * as campaignService from '../../services/campaignService';
import * as categoryService from '../../services/categoryService';
import { useRouter } from 'next/navigation';

jest.mock('../../services/campaignService');
jest.mock('../../services/categoryService');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('NovoFormulárioDeCampanha', () => {
  const mockRouter = { push: jest.fn(), back: jest.fn() };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (categoryService.getCategories as jest.Mock).mockResolvedValue([
      { id: 1, name: 'Categoria 1' },
      { id: 2, name: 'Categoria 2' },
    ]);
  });

  test('renderiza os elementos do formulário', async () => {
    await act(async () => {
      render(<NewCampaignForm />);
    });

    expect(screen.getByText('Criar Nova Campanha')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome:')).toBeInTheDocument();
    expect(screen.getByLabelText('Data de Início:')).toBeInTheDocument();
    expect(screen.getByLabelText('Data de Fim:')).toBeInTheDocument();
    expect(screen.getByLabelText('Categoria:')).toBeInTheDocument();
  });

  test('exibe erro se a data de início estiver no passado', async () => {
    await act(async () => {
      render(<NewCampaignForm />);
    });

    fireEvent.change(screen.getByLabelText('Data de Início:'), { target: { value: '2020-01-01' } });
    fireEvent.change(screen.getByLabelText('Data de Fim:'), { target: { value: '2024-01-01' } });
    fireEvent.click(screen.getByText('Criar Campanha'));

    await waitFor(() => {
      expect(screen.getByTestId('start-date-error')).toBeInTheDocument();
    });
  });

  test('exibe erro se a data de fim for anterior à data de início', async () => {
    await act(async () => {
      render(<NewCampaignForm />);
    });

    fireEvent.change(screen.getByLabelText('Data de Início:'), { target: { value: '2024-01-01' } });
    fireEvent.change(screen.getByLabelText('Data de Fim:'), { target: { value: '2023-12-31' } });
    fireEvent.click(screen.getByText('Criar Campanha'));

    await waitFor(() => {
      expect(screen.getByText('A data de fim deve ser maior que a data de início.')).toBeInTheDocument();
    });
  });

  test('chama router.back ao cancelar', async () => {
    await act(async () => {
      render(<NewCampaignForm />);
    });

    fireEvent.click(screen.getByText('Cancelar'));

    expect(mockRouter.back).toHaveBeenCalled();
  });
});
