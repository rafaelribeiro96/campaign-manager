'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  getCampaignById,
  updateCampaign,
  deleteCampaign,
} from '../../../services/campaignService';
import { getCategories } from '../../../services/categoryService';
import Layout from '../../../components/Layout';
import styles from './campaignDetails.module.css';

const CampaignDetails: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [campaign, setCampaign] = useState<any>(null);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('ativa');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await getCampaignById(id as string);
        if (data) {
          const today = new Date().toISOString().split('T')[0];
          const isExpired = data.endDate < today ? 'expirada' : data.status;
          setCampaign({
            ...data,
            status: isExpired,
          });
          setName(data.name);
          setStatus(isExpired);
          setStartDate(data.startDate);
          setEndDate(data.endDate);
          setCategory(data.category);
        }
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    if (endDate) {
      let updatedStatus = status;

      if (endDate < today) {
        updatedStatus = 'expirada';
      } else if (endDate >= today) {
        if (status === 'expirada') {
          updatedStatus = 'ativa';
        }
      }

      setStatus(updatedStatus);
    }
  }, [endDate, status]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormDirty) {
      const today = new Date().toISOString().split('T')[0];
      const updatedStatus = endDate < today ? 'expirada' : status;

      const updatedCampaign = {
        id: id as string,
        name,
        status: updatedStatus,
        startDate,
        endDate,
        category,
      };

      await updateCampaign(updatedCampaign.id, updatedCampaign);
      setIsEditing(false);
      setIsFormDirty(false);
    }
  };

  const handlePauseResume = async () => {
    const today = new Date().toISOString().split('T')[0];
    let updatedStatus = status === 'ativa' ? 'pausada' : 'ativa';

    if (endDate < today) {
      updatedStatus = 'expirada';
    }

    const updatedCampaign = {
      id: id as string,
      name,
      status: updatedStatus,
      startDate,
      endDate,
      category,
    };

    await updateCampaign(updatedCampaign.id, updatedCampaign);
    setCampaign({ ...campaign, status: updatedStatus });
    setStatus(updatedStatus);
  };

  const handleDelete = async () => {
    await deleteCampaign(id as string);
    router.push('/campaign');
  };

  const handleBack = () => {
    router.push('/campaign');
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setIsFormDirty(true);
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'startDate':
        setStartDate(e.target.value);
        break;
      case 'endDate':
        setEndDate(e.target.value);
        break;
      case 'category':
        setCategory(e.target.value);
        break;
      default:
        break;
    }
  };

  if (!campaign) return <div>Carregando...</div>;

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{isEditing ? 'Editar Campanha' : 'Detalhes da Campanha'}</h2>
          <button className={styles.backButton} onClick={handleBack}>
            Voltar
          </button>
        </div>
        <div className={styles.formContainer}>
          <form onSubmit={handleUpdate}>
            <label>
              Nome:
              <input
                type="text"
                name="name"
                value={name}
                disabled={!isEditing}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Status:
              <input
                type="text"
                name="status"
                value={status}
                disabled
              />
            </label>
            <label>
              Data de Início:
              <input
                type="date"
                name="startDate"
                value={startDate}
                disabled={!isEditing}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Data de Fim:
              <input
                type="date"
                name="endDate"
                value={endDate}
                disabled={!isEditing}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Categoria:
              <select
                name="category"
                value={category}
                disabled={!isEditing}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Selecione uma categoria</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </label>
            <div className={styles.actions}>
              {isEditing ? (
                <>
                  <button className={styles.saveButton} type="submit">Salvar</button>
                  <button className={styles.cancelButton} type="button" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button className={styles.editButton} type="button" onClick={toggleEditMode}>
                    Editar
                  </button>
                  <button className={styles.deleteButton} type="button" onClick={handleDelete}>
                    Excluir
                  </button>
                  {status === 'ativa' ? (
                    <button className={styles.pauseButton} type="button" onClick={handlePauseResume}>
                      Pausar
                    </button>
                  ) : status === 'pausada' ? (
                    <button className={styles.resumeButton} type="button" onClick={handlePauseResume}>
                      Continuar
                    </button>
                  ) : null}
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CampaignDetails;
