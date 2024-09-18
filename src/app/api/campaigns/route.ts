import { NextResponse } from 'next/server';
import { readDataFromFile, writeDataToFile } from '../../../services/fileUtils';

export async function GET() {
  const campaigns = await readDataFromFile();
  return NextResponse.json(campaigns);
}

export async function POST(request: Request) {
  const newCampaign = await request.json();
  const campaigns = await readDataFromFile();
  const newId = (
    parseInt(campaigns[campaigns.length - 1]?.id || '0') + 1
  ).toString();
  newCampaign.id = newId;
  campaigns.push(newCampaign);
  await writeDataToFile(campaigns);
  return NextResponse.json(newCampaign);
}
