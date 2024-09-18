import { NextResponse } from 'next/server';
import verifyExpiredCampaigns from '../../../services/verifyExpiredCampaigns';

export async function GET() {
  try {
    await verifyExpiredCampaigns();
    return NextResponse.json({ message: 'Campanhas expiradas verificadas e atualizadas.' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar campanhas expiradas.' }, { status: 500 });
  }
}
