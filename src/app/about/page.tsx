'use client';

import React from 'react';
import styles from './about.module.css';
import Layout from '../../components/Layout';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Sobre Nós</h1>
        </header>
        <section className={styles.content}>
          <h2>Nossa História</h2>
          <p>
            A nossa aplicação nasceu com a missão de simplificar o gerenciamento de campanhas.
            Criamos uma plataforma intuitiva e poderosa para ajudar você a maximizar o impacto
            das suas campanhas de marketing.
          </p>
          <h2>Nossa Missão</h2>
          <p>
            Nosso objetivo é oferecer ferramentas que permitam a você gerenciar suas campanhas
            de forma eficiente e eficaz, com foco em resultados e simplicidade.
          </p>
          <h2>Equipe</h2>
          <p>
            Somos uma equipe dedicada de profissionais apaixonados por tecnologia e marketing.
            Combinamos nossa expertise para criar soluções que atendam às suas necessidades.
          </p>
        </section>
        <footer className={styles.footer}>
          <p>&copy; 2024 Gerenciador de Campanhas. Todos os direitos reservados.</p>
        </footer>
      </div>
    </Layout>
  );
};

export default AboutPage;
