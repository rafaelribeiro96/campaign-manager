import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import CampaignPage from '../campaign/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../campaign/CampaignList', () => () => <div data-testid="campaign-list" />);

describe('CampaignPage', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  test('renders CampaignPage and the New Campaign button', () => {
    render(<CampaignPage />);

    expect(screen.getByText('Nova Campanha')).toBeInTheDocument();

    expect(screen.getByTestId('campaign-list')).toBeInTheDocument();
  });

  test('navigates to /campaign/new on button click', () => {
    render(<CampaignPage />);

    fireEvent.click(screen.getByText('Nova Campanha'));

    expect(mockPush).toHaveBeenCalledWith('/campaign/new');
  });
});
