'use client';

import React, { useEffect, useState } from 'react';
import CampaignCard from '../../components/CampaignCard';
import { getCampaigns } from '../../services/campaignService';
import { getCategories } from '../../services/categoryService';
import { useRouter } from 'next/navigation';
import styles from './campaign.module.css';
import { Skeleton } from '@mui/material';

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
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 12;


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

  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = filteredCampaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);

  const totalPages = Math.ceil(filteredCampaigns.length / campaignsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };



  const applyFilter = () => {
    const filtered = campaigns.filter((campaign) => {
      const statusMatches = selectedStatus ? campaign.status === selectedStatus : true;
      const categoryMatches = selectedCategory ? campaign.category === selectedCategory : true;
      return statusMatches && categoryMatches;
    });

    setFilteredCampaigns(filtered);
  };

  const sortCampaigns = (campaignsToSort: Campaign[]) => {
    return [...campaignsToSort].sort((a, b) => {
      let fieldA, fieldB;
      switch (sortOption) {
        case 'startDate':
          fieldA = new Date(a.startDate).getTime();
          fieldB = new Date(b.startDate).getTime();
          break;
        case 'endDate':
          fieldA = new Date(a.endDate).getTime();
          fieldB = new Date(b.endDate).getTime();
          break;
        case 'createdAt':
          fieldA = new Date(a.createdAt).getTime();
          fieldB = new Date(b.createdAt).getTime();
          break;
        case 'category':
          fieldA = a.category.toLowerCase();
          fieldB = b.category.toLowerCase();
          break;
        default:
          return 0;
      }

      if (sortDirection === 'asc') {
        return fieldA > fieldB ? 1 : -1;
      } else {
        return fieldA < fieldB ? 1 : -1;
      }
    });
  };

  useEffect(() => {
    const sortedCampaigns = sortCampaigns(filteredCampaigns);
    setFilteredCampaigns(sortedCampaigns);
  }, [sortOption, sortDirection]);

  const handleCampaignClick = (id: string) => {
    router.push(`/campaign/${id}`);
  };

  return (
    <div>
      <div className={styles.filterAndSortContainer}>
        <div className={styles.sortContainer}>
          <label>
            Ordenar por:
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="">Selecione</option>
              <option value="startDate">Data de Início</option>
              <option value="endDate">Data de Fim</option>
              <option value="createdAt">Criada em</option>
              <option value="category">Categoria</option>
            </select>
          </label>

          <label>
            Direção:
            <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
              <option value="asc">Crescente</option>
              <option value="desc">Decrescente</option>
            </select>
          </label>
        </div>

        <div className={styles.filterContainer}>
          <div className={styles.filterForm}>
            <label>
              Filtrar status:
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                <option value="">Todos</option>
                <option value="Ativa">Ativa</option>
                <option value="Pausada">Pausada</option>
                <option value="Expirada">Expirada</option>
              </select>
            </label>

            <label>
              Filtrar categoria:
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
              Filtrar
            </button>
          </div>
        </div>


      </div>

      <div className={styles.campaignList}>
        {loading ? (
          <>
            {Array.from({ length: campaignsPerPage }).map((_, index) => (
              <Skeleton
                className={styles.skeleton}
                key={index}
                variant="rectangular"
                height={200}
              />
            ))}
          </>
        ) : error ? (
          <p>{error}</p>
        ) : currentCampaigns.length > 0 ? (
          currentCampaigns.map((campaign) => (
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

      <div className={styles.pagination}>
        {currentPage > 1 && (
          <button onClick={prevPage}>
            Anterior
          </button>
        )}
        <span>
          Página {currentPage} de {totalPages}
        </span>
        {currentPage < totalPages && (
          <button onClick={nextPage}>
            Próxima
          </button>
        )}
      </div>




    </div>
  );
};

export default CampaignList;
