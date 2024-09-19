import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import CampaignPage from '../campaign/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../campaign/CampaignList', () => () => <div data-testid="campaign-list" />);

describe('Página de Campanhas', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  test('renderiza a Página de Campanhas e o botão Nova Campanha', () => {
    render(<CampaignPage />);

    expect(screen.getByText('Nova Campanha')).toBeInTheDocument();

    expect(screen.getByTestId('campaign-list')).toBeInTheDocument();
  });

  test('navega para /campaign/new ao clicar no botão', () => {
    render(<CampaignPage />);

    fireEvent.click(screen.getByText('Nova Campanha'));

    expect(mockPush).toHaveBeenCalledWith('/campaign/new');
  });
});
