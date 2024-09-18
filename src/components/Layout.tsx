import React from 'react';
import styles from './layout.module.css';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Gerenciamento de Campanhas</h1>
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
