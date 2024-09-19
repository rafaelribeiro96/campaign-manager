import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from '@/components/Layout';
import styles from './layout.module.css';

describe('Layout Component', () => {
  test('renders header with navigation links', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    expect(screen.getByText('Gerenciamento de Campanhas')).toBeInTheDocument();
    expect(screen.getByText('Gerenciamento de Campanhas')).toHaveClass(styles.title);

    const homeLink = screen.getByText('Home');
    const campaignsLink = screen.getByText('Campanhas');
    const aboutLink = screen.getByText('Sobre');

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
    expect(homeLink).toHaveClass(styles.navLink);

    expect(campaignsLink).toBeInTheDocument();
    expect(campaignsLink).toHaveAttribute('href', '/campaign');
    expect(campaignsLink).toHaveClass(styles.navLink);

    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(aboutLink).toHaveClass(styles.navLink);

    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Content').parentElement).toHaveClass(styles.mainContent);

    expect(screen.getByText('© 2024 Gerenciamento de Campanhas. Todos os direitos reservados.')).toBeInTheDocument();
    expect(screen.getByText('© 2024 Gerenciamento de Campanhas. Todos os direitos reservados.')).toHaveClass(styles.footerText);
  });
});
