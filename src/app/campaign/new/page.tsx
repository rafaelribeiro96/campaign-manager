'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCampaign } from '../../../services/campaignService';
import { getCategories } from '../../../services/categoryService';
import Layout from '../../../components/Layout';
import styles from './newCampaign.module.css';

const NewCampaignForm: React.FC = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('ativa');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const today = new Date().toISOString().split('T')[0];

    if (startDate < today) {
      setError('A data de início não pode ser menor que a data atual.');
      return;
    }

    if (endDate <= startDate) {
      setError('A data de fim deve ser maior que a data de início.');
      return;
    }

    setError('');

    const status = endDate < today ? 'expirada' : 'ativa';

    const newCampaign = {
      name,
      status,
      startDate,
      endDate,
      category,
    };

    try {
      await createCampaign(newCampaign);
      router.push('/campaign');
    } catch (error) {
      setError('Falha ao criar a campanha.');
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Layout>
      <div className={styles.formContainer}>
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
            <select value={status} disabled onChange={(e) => setStatus(e.target.value)}>
              <option value="ativa">Ativa</option>
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
          <div>
            <label>Categoria:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="" disabled>Selecione uma categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit">Criar Campanha</button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default NewCampaignForm;
