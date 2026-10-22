import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [stats, setStats] = useState({ totalClients: 0, totalDeals: 0, totalAmount: 0 });

  useEffect(() => {
    // Запрашиваем статистику у сервера
    axios.get('http://localhost:4000/api/dashboard')
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Главная страница</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>Общая статистика по вашей работе</p>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* Карточка клиентов */}
        <div style={{ flex: 1, minWidth: '200px', background: '#e3f2fd', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #2196f3' }}>
          <h3 style={{ margin: 0, color: '#555' }}>Всего клиентов</h3>
          <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#2196f3' }}>
            {stats.totalClients}
          </p>
        </div>

        {/* Карточка сделок */}
        <div style={{ flex: 1, minWidth: '200px', background: '#e8f5e9', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #4caf50' }}>
          <h3 style={{ margin: 0, color: '#555' }}>Всего сделок</h3>
          <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#4caf50' }}>
            {stats.totalDeals}
          </p>
        </div>

        {/* Карточка суммы */}
        <div style={{ flex: 1, minWidth: '200px', background: '#fff3e0', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #ff9800' }}>
          <h3 style={{ margin: 0, color: '#555' }}>Общая сумма сделок</h3>
          <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#ff9800' }}>
            {stats.totalAmount.toLocaleString('ru-RU')} ₽
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;