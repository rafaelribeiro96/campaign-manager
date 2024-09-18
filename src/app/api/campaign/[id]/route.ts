import { NextResponse } from 'next/server';
import {
  readDataFromFile,
  writeDataToFile,
} from '../../../../services/fileUtils';

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);
  const id = pathname.split('/').pop();

  const campaigns = await readDataFromFile();
  const campaign = campaigns.find((campaign) => campaign.id === id);

  if (campaign) {
    return NextResponse.json(campaign);
  } else {
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
  }
}

export async function PUT(request: Request) {
  const data = await request.json();
  const { id, ...updateData } = data;
  const campaigns = await readDataFromFile();
  const index = campaigns.findIndex((campaign) => campaign.id === id);

  if (index !== -1) {
    const today = new Date().toISOString().split('T')[0];
    let updatedStatus = updateData.status;

    if (updateData.endDate < today) {
      updatedStatus = 'Expirada';
    } else if (updateData.status === 'Pausada' && updateData.endDate >= today) {
      updatedStatus = 'Pausada';
    } else if (updateData.status === 'Ativa' && updateData.endDate >= today) {
      updatedStatus = 'Ativa';
    }

    campaigns[index] = { ...campaigns[index], ...updateData, status: updatedStatus };
    await writeDataToFile(campaigns);
    return NextResponse.json(campaigns[index]);
  } else {
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
  }
}



export async function DELETE(request: Request) {
  const { id } = await request.json();
  const campaigns = await readDataFromFile();
  const index = campaigns.findIndex((campaign) => campaign.id === id);

  if (index !== -1) {
    const [deletedCampaign] = campaigns.splice(index, 1);
    await writeDataToFile(campaigns);
    return NextResponse.json(deletedCampaign);
  } else {
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
  }
}

export async function POST(request: Request) {
  const newCampaign = await request.json();
  const campaigns = await readDataFromFile();
  const newId = (parseInt(campaigns[campaigns.length - 1]?.id || '0') + 1).toString();
  newCampaign.id = newId;
  newCampaign.createdAt = new Date().toISOString();

  const today = new Date().toISOString().split('T')[0];
  newCampaign.status = newCampaign.endDate < today ? 'Expirada' : 'Ativa';

  campaigns.push(newCampaign);
  await writeDataToFile(campaigns);
  return NextResponse.json(newCampaign);
}