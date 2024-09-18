'use client';

import React, { useEffect, useState } from 'react';
import CampaignCard from '../../components/CampaignCard';
import { getCampaigns } from '../../services/campaignService';
import { getCategories } from '../../services/categoryService';
import { useRouter } from 'next/navigation';
import styles from './campaign.module.css';

interface Campaign {
  id: string;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  category: string;
}

const CampaignList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const campaignsData = await getCampaigns();
        setCampaigns(campaignsData);
        setFilteredCampaigns(campaignsData);
      } catch (err) {
        setError('Não foi possível carregar as campanhas.');
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        const categoryNames = categoriesData.map((category) => category.name);
        setCategories(categoryNames);
      } catch (err) {
        console.error('Erro ao carregar categorias:', err);
      }
    };

    fetchCampaigns();
    fetchCategories();
  }, []);

  const applyFilter = () => {
    const filtered = campaigns.filter((campaign) => {
      const statusMatches = selectedStatus ? campaign.status === selectedStatus : true;
      const categoryMatches = selectedCategory ? campaign.category === selectedCategory : true;
      return statusMatches && categoryMatches;
    });
    setFilteredCampaigns(filtered);
  };

  const handleCampaignClick = (id: string) => {
    router.push(`/campaign/${id}`);
  };

  return (
    <div>
      <div className={styles.filterContainer}>
        <button onClick={() => setShowFilter(!showFilter)} className={styles.filterButton}>
          {showFilter ? 'Fechar Filtros' : 'Filtrar'}
        </button>

        {showFilter && (
          <div className={styles.filterForm}>
            <label>
              Status:
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                <option value="">Todos</option>
                <option value="ativa">Ativa</option>
                <option value="pausada">Pausada</option>
                <option value="expirada">Expirada</option>
              </select>
            </label>

            <label>
              Categoria:
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">Todas</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <button onClick={applyFilter} className={styles.applyFilterButton}>
              Aplicar Filtro
            </button>
          </div>
        )}
      </div>

      <div className={styles.campaignList}>
        {loading ? (
          <p>Carregando campanhas...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onClick={() => handleCampaignClick(campaign.id)}
            />
          ))
        ) : (
          <p>Nenhuma campanha disponível.</p>
        )}
      </div>
    </div>
  );
};

export default CampaignList;
