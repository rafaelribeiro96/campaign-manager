import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import HomePage from '../page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('HomePage', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  test('renders HomePage correctly', () => {
    render(<HomePage />);

    expect(screen.getByText('Bem-vindo ao Gerenciador de Campanhas')).toBeInTheDocument();
    expect(screen.getByText('Gerencie suas campanhas de forma fácil e eficiente com nossa aplicação.')).toBeInTheDocument();

    expect(screen.getByText('Gerenciar Campanhas')).toBeInTheDocument();

    expect(screen.getByAltText('Campaign Manager Banner')).toBeInTheDocument();

    expect(screen.getByText('Fácil de Usar')).toBeInTheDocument();
    expect(screen.getByText('Relatórios Detalhados')).toBeInTheDocument();
    expect(screen.getByText('Suporte Dedicado')).toBeInTheDocument();
  });

  test('navigates to /campaign on button click', () => {
    render(<HomePage />);

    fireEvent.click(screen.getByText('Gerenciar Campanhas'));

    expect(mockPush).toHaveBeenCalledWith('/campaign');
  });
});
