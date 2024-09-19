import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CampaignCard from '../../components/CampaignCard';

describe('Cartão da Campanha', () => {
  const campaign = {
    id: '1',
    name: 'Campanha Teste',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    createdAt: '2024-01-01T12:00:00Z',
    category: 'Categoria Teste',
  };

  it('deve renderizar o cartão da campanha com os dados corretos', () => {
    render(<CampaignCard campaign={campaign} />);
    expect(screen.getByText(campaign.name)).toBeInTheDocument();
    expect(screen.getByText(campaign.status)).toBeInTheDocument();
    expect(screen.getByText(campaign.status)).toHaveClass('active');
  });

  it('deve chamar o manipulador onClick quando o cartão for clicado', () => {
    const handleClick = jest.fn();
    render(<CampaignCard campaign={campaign} onClick={handleClick} />);
    const cardContainer = screen.getByTestId('card-container');
    fireEvent.click(cardContainer);
    expect(handleClick).toHaveBeenCalled();
  });

  it('deve renderizar "Data não disponível" se createdAt não for fornecida', () => {
    const campaignWithoutCreatedAt = {
      ...campaign,
      createdAt: undefined,
    };

    render(<CampaignCard campaign={campaignWithoutCreatedAt} />);

    expect(screen.getByText('Data não disponível')).toBeInTheDocument();
  });
});
