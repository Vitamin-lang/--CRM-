import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Боковое меню */}
      <aside style={{ width: '250px', backgroundColor: '#2c3e50', color: 'white', padding: '20px' }}>
        <h2 style={{ marginBottom: '30px' }}>Мини-CRM</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>📊 Дашборд</Link>
          <Link to="/clients" style={{ color: 'white', textDecoration: 'none' }}>👥 Клиенты</Link>
          <Link to="/deals" style={{ color: 'white', textDecoration: 'none' }}>💼 Сделки</Link>
        </nav>
      </aside>

      {/* Основная область */}
      <main style={{ flex: 1, padding: '20px' }}>
        <header style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <h3>Панель управления</h3>
        </header>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <Outlet /> {/* Сюда будут вставляться страницы */}
        </div>
      </main>
    </div>
  );
}

export default Layout;
