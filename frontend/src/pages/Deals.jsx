import { useState, useEffect } from 'react';
import axios from 'axios';

function Deals() {
  const [deals, setDeals] = useState([]);
  const [formData, setFormData] = useState({ title: '', amount: '', status: 'new' });

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = () => {
    axios.get('http://localhost:4000/api/deals')
      .then(res => setDeals(res.data))
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return alert('Введите название сделки!');

    axios.post('http://localhost:4000/api/deals', formData)
      .then(() => {
        alert('Сделка добавлена!');
        setFormData({ title: '', amount: '', status: 'new' });
        fetchDeals();
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Сделки</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
        <h3>Добавить сделку</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
          <input type="text" name="title" placeholder="Название сделки *" value={formData.title} onChange={handleChange} required style={{ padding: '8px', flex: 1 }} />
          <input type="number" name="amount" placeholder="Сумма (₽)" value={formData.amount} onChange={handleChange} style={{ padding: '8px' }} />
          <select name="status" value={formData.status} onChange={handleChange} style={{ padding: '8px' }}>
            <option value="new">Новая</option>
            <option value="in_progress">В работе</option>
            <option value="won">Успешно</option>
            <option value="lost">Провалена</option>
          </select>
          <button type="submit">Добавить</button>
        </div>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#eee', textAlign: 'left' }}>
            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>ID</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Название</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Сумма</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Статус</th>
          </tr>
        </thead>
        <tbody>
          {deals.length === 0 ? (
            <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>Сделок пока нет</td></tr>
          ) : (
            deals.map(deal => (
              <tr key={deal.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{deal.id}</td>
                <td style={{ padding: '10px' }}>{deal.title}</td>
                <td style={{ padding: '10px' }}>{deal.amount} ₽</td>
                <td style={{ padding: '10px' }}>
                   <span style={{ 
                     padding: '4px 8px', borderRadius: '4px', fontSize: '12px',
                     backgroundColor: deal.status === 'won' ? '#d4edda' : deal.status === 'lost' ? '#f8d7da' : '#fff3cd'
                   }}>
                     {deal.status === 'new' ? 'Новая' : deal.status === 'in_progress' ? 'В работе' : deal.status === 'won' ? 'Успешно' : 'Провалена'}
                   </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Deals;