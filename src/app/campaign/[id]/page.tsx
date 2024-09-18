'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  getCampaignById,
  updateCampaign,
  deleteCampaign,
} from '../../../services/campaignService';
import Layout from '../../../components/Layout';

const CampaignDetails: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [campaign, setCampaign] = useState<any>(null);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('ativa');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const data = await getCampaignById(id as string);
        setCampaign(data);
        if (data) {
          setName(data.name);
          setStatus(data.status);
          setStartDate(data.startDate);
          setEndDate(data.endDate);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCampaign = {
      id: id as string,
      name,
      status,
      startDate,
      endDate,
    };

    await updateCampaign(updatedCampaign.id, updatedCampaign);
    router.push('/campaign');
  };

  const handleDelete = async () => {
    await deleteCampaign(id as string);
    router.push('/campaign');
  };

  if (!campaign) return <div>Carregando...</div>;

  return (
    <Layout>
      <h2>Editar Campanha</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="ativa">Ativa</option>
            <option value="expirada">Expirada</option>
          </select>
        </div>
        <div>
          <label>Data de Início:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data de Fim:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
      <button onClick={handleDelete}>Excluir Campanha</button>
    </Layout>
  );
};

export default CampaignDetails;
