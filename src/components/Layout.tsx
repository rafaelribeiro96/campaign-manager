import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header>
        <h1>Gerenciamento de Campanhas</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
