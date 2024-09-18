'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getCampaignById, updateCampaign, deleteCampaign } from '../../../services/campaignService';
import { getCategories } from '../../../services/categoryService';
import Layout from '../../../components/Layout';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import styles from './campaignDetails.module.css';
import { ArrowBack } from '@mui/icons-material';

const CampaignDetails: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [campaign, setCampaign] = useState<any>(null);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Ativa');
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
          const isExpired = data.endDate < today ? 'Expirada' : data.status;
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
        updatedStatus = 'Expirada';
      } else if (endDate >= today) {
        if (status === 'Expirada') {
          updatedStatus = 'Ativa';
        }
      }

      setStatus(updatedStatus);
    }
  }, [endDate, status]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormDirty) {
      const today = new Date().toISOString().split('T')[0];
      const updatedStatus = endDate < today ? 'Expirada' : status;

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
    let updatedStatus = status === 'Ativa' ? 'Pausada' : 'Ativa';

    if (endDate < today) {
      updatedStatus = 'Expirada';
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
          <button className={styles.backButton} onClick={handleBack}>
            <ArrowBack />
          </button>
          <h2>{isEditing ? 'Editar Campanha' : 'Detalhes da Campanha'}</h2>
          <div></div>
        </div>
        <form onSubmit={handleUpdate} className={styles.formContainer}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={name}
              disabled={!isEditing}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Status:
            <input type="text" name="status" value={status} disabled />
          </label>
          <label>
            Data de Início:
            <input
              type="date"
              name="startDate"
              value={startDate}
              disabled={!isEditing}
              onChange={handleInputChange}
              required
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
              required
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
              <option value="">Selecione uma categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
          <div className={styles.actions}>
            {isEditing ? (
              <>
                <button type="submit" aria-label="Salvar" title="Salvar edição">
                  <SaveIcon style={{ color: '#387e3a' }} />
                </button>
                <button type="button" aria-label="Cancelar" title="Cancelar edição" onClick={() => setIsEditing(false)}>
                  <CancelIcon style={{ color: '#993c35' }} />
                </button>
              </>
            ) : (
              <>
                {status === 'Ativa' ? (
                  <button type="button" aria-label="Pausar" title="Pausar campanha" onClick={handlePauseResume}>
                    <PauseIcon style={{ color: '#100e33' }} />
                  </button>
                ) : (
                  <button type="button" aria-label="Retomar" title="Retomar campanha" onClick={handlePauseResume}>
                    <PlayArrowIcon style={{ color: '#387e3a' }} />
                  </button>
                )}
                <button type="button" aria-label="Editar" title="Editar campanha" onClick={toggleEditMode}>
                  <EditIcon style={{ color: '#7c5925' }} />
                </button>
                <button type="button" aria-label="Excluir" title="Remover campanha" onClick={handleDelete}>
                  <DeleteIcon style={{ color: '#993c35' }} />
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CampaignDetails;
