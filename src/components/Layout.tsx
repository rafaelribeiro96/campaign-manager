import React from 'react';
import styles from './layout.module.css';
import { Facebook, GitHub, Instagram, LinkedIn, LogoDev, Twitter } from '@mui/icons-material';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <div className={styles.logoContainer}>
            <img src="/images/logoawsales.avif" alt="Logo" className={styles.logo} />
          </div>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Gestor de Campanhas</h1>
          </div>
          <div className={styles.socialLinks}>
            <a href="https://www.linkedin.com/in/rafaelfeliperibeiro/" className={styles.socialLink}><LinkedIn /></a>
            <a href="https://github.com/rafaelribeiro96" className={styles.socialLink}><GitHub /></a>
            <a href="https://rafaelribeiro96.github.io/" className={styles.socialLink}><Instagram /></a>
          </div>
        </div>


        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="/" className={styles.navLink}>Home</a>
            </li>
            <li className={styles.navItem}>
              <a href="/campaign" className={styles.navLink}>Campanhas</a>
            </li>
            <li className={styles.navItem}>
              <a href="/about" className={styles.navLink}>Sobre</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.mainContent}>{children}</main>
      <footer className={styles.footer}>
        <p className={styles.footerText}>&copy; 2024 Gerenciamento de Campanhas. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Layout;
