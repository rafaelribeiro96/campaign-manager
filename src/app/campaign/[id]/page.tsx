'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  getCampaignById,
  updateCampaign,
  deleteCampaign,
} from '../../../services/campaignService';
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
  const [isEditing, setIsEditing] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

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
    if (isFormDirty) {
      const updatedCampaign = {
        id: id as string,
        name,
        status,
        startDate,
        endDate,
      };

      await updateCampaign(updatedCampaign.id, updatedCampaign);
      setIsEditing(false);
      setIsFormDirty(false);
    }
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
      case 'status':
        setStatus(e.target.value);
        break;
      case 'startDate':
        setStartDate(e.target.value);
        break;
      case 'endDate':
        setEndDate(e.target.value);
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
            <div>
              <label>Nome:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleInputChange}
                required
                disabled={!isEditing}
              />
            </div>
            <div>
              <label>Status:</label>
              <select
                name="status"
                value={status}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="ativa">Ativa</option>
                <option value="expirada">Expirada</option>
              </select>
            </div>
            <div>
              <label>Data de Início:</label>
              <input
                type="date"
                name="startDate"
                value={startDate}
                onChange={handleInputChange}
                required
                disabled={!isEditing}
              />
            </div>
            <div>
              <label>Data de Fim:</label>
              <input
                type="date"
                name="endDate"
                value={endDate}
                onChange={handleInputChange}
                required
                disabled={!isEditing}
              />
            </div>
            {isEditing ? (
              <>
                <button type="submit" className={styles.saveButton}>
                  Salvar Alterações
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={styles.editButton}
                  onClick={toggleEditMode}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={handleDelete}
                >
                  Excluir Campanha
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CampaignDetails;
