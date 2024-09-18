export const getCampaigns = async () => {
  const response = await fetch('/api/campaigns');
  if (!response.ok) {
    throw new Error('Failed to fetch campaigns');
  }
  return response.json();
};

export const getCampaignById = async (id: string) => {
  const response = await fetch(`/api/campaign/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch campaign');
  }
  return response.json();
};

export const createCampaign = async (data: any) => {
  const today = new Date().toISOString().split('T')[0];
  const status = data.endDate < today ? 'expirada' : 'ativa';

  const response = await fetch('/api/campaigns', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      status,
      createdAt: new Date().toISOString(),
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to create campaign');
  }
  return response.json();
};



export const updateCampaign = async (id: string, data: any) => {
  const today = new Date().toISOString().split('T')[0];
  let updatedStatus = data.status;

  if (data.endDate < today) {
    updatedStatus = 'expirada';
  } else if (data.status === 'pausada' && data.endDate >= today) {
    updatedStatus = 'pausada';
  } else if (data.status === 'ativa' && data.endDate >= today) {
    updatedStatus = 'ativa';
  }

  const response = await fetch(`/api/campaign/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, status: updatedStatus }),
  });

  if (!response.ok) {
    throw new Error('Failed to update campaign');
  }
  return response.json();
};





export const deleteCampaign = async (id: string) => {
  const response = await fetch(`/api/campaign/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error('Failed to delete campaign');
  }
  return response.json();
};
