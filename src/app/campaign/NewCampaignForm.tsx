'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCampaign } from '../../services/campaignService';
import Layout from '../../components/Layout';

const NewCampaignForm: React.FC = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('ativa');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCampaign = {
      name,
      status,
      startDate,
      endDate,
    };

    await createCampaign(newCampaign);
    router.push('/campaign');
  };

  return (
    <Layout>
      <h2>Criar Nova Campanha</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Criar Campanha</button>
      </form>
    </Layout>
  );
};

export default NewCampaignForm;
