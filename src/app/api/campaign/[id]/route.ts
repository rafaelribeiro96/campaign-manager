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
    campaigns[index] = { ...campaigns[index], ...updateData };
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
