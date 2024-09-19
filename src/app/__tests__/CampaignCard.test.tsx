import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CampaignCard from '../../components/CampaignCard';

describe('CampaignCard', () => {
  const campaign = {
    id: '1',
    name: 'Campanha Teste',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    createdAt: '2024-01-01T12:00:00Z',
    category: 'Categoria Teste',
  };

  it('should render the campaign card with correct data', () => {
    render(<CampaignCard campaign={campaign} />);
    expect(screen.getByText(campaign.name)).toBeInTheDocument();
    expect(screen.getByText(campaign.status)).toBeInTheDocument();
    expect(screen.getByText(campaign.status)).toHaveClass('active');
  });

  it('should call onClick handler when card is clicked', () => {
    const handleClick = jest.fn();
    render(<CampaignCard campaign={campaign} onClick={handleClick} />);
    const cardContainer = screen.getByTestId('card-container');
    fireEvent.click(cardContainer);
    expect(handleClick).toHaveBeenCalled();
  });

  it('should render "Data não disponível" if createdAt is not provided', () => {
    const campaignWithoutCreatedAt = {
      ...campaign,
      createdAt: undefined,
    };

    render(<CampaignCard campaign={campaignWithoutCreatedAt} />);

    expect(screen.getByText('Data não disponível')).toBeInTheDocument();
  });
});
