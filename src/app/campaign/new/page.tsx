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
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    let formValid = true;

    if (startDate && startDate < today) {
      setError('A data de início não pode ser menor que a data atual.');
      formValid = false;
    } else if (endDate && endDate <= startDate) {
      setError('A data de fim deve ser maior que a data de início.');
      formValid = false;
    } else {
      setError('');
    }

    if (!name || !startDate || !endDate || !category) {
      formValid = false;
    }

    setIsFormValid(formValid);
  }, [name, startDate, endDate, category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    const newCampaign = {
      name,
      status: 'Ativa',
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
            <li>O status será automaticamente definido como "Ativa".</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nome:</label>
            <input
              className={styles.nameInput}
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="status">Status:</label>
            <select id="status" value="Ativa" disabled>
              <option value="Ativa">Ativa</option>
            </select>
          </div>
          <div>
            <label htmlFor="startDate">Data de Início:</label>
            <input
              className={styles.dateInput}
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className={styles.endDateContainer}>
            <label htmlFor="endDate">Data de Fim:</label>
            <input
              className={styles.dateInput}
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="category">Categoria:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Selecione uma categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          {error && <p data-testid="start-date-error" className={styles.error}>{error}</p>}

          <div className={styles.buttonsContainer}>
            <button type="button" className={styles.cancelButton} onClick={handleCancel}>
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.newCampaignButton}
              disabled={!isFormValid}
            >
              Criar Campanha
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NewCampaignForm;
