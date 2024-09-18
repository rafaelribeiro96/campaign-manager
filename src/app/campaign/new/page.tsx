'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCampaign } from '../../../services/campaignService';
import { getCategories } from '../../../services/categoryService';
import Layout from '../../../components/Layout';
import styles from './newCampaign.module.css';

const NewCampaignForm: React.FC = () => {
  const [name, setName] = useState('');
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

    const newCampaign = {
      name,
      status: 'ativa',
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

        <div className={styles.observations}>
          <p>Regras para criar uma campanha:</p>
          <ul>
            <li>A data de início não pode ser menor que a data atual.</li>
            <li>A data de fim deve ser maior que a data de início.</li>
            <li>O status será automaticamente definido como "ativa".</li>
          </ul>
        </div>

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
            <select value="ativa" disabled>
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

          {/* Botões com alinhamento */}
          <div className={styles.buttonsContainer}>
            <button type="button" className={styles.cancelButton} onClick={handleCancel}>
              Cancelar
            </button>
            <button type="submit" className={styles.newCampaignButton}>
              Criar Campanha
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NewCampaignForm;
