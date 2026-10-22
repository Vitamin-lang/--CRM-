import { useState, useEffect } from 'react';
import axios from 'axios';

function Clients() {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', company: '' });

  // Загружаем клиентов при открытии страницы
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    axios.get('http://localhost:4000/api/clients')
      .then(res => setClients(res.data))
      .catch(err => console.error(err));
  };

  // Обработка ввода в форму
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Отправка формы
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return alert('Введите имя клиента!');

    axios.post('http://localhost:4000/api/clients', formData)
      .then(() => {
        alert('Клиент добавлен!');
        setFormData({ name: '', phone: '', email: '', company: '' }); // Очищаем форму
        fetchClients(); // Обновляем список
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Клиенты</h2>
      
      {/* Форма добавления */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
        <h3>Добавить клиента</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
          <input type="text" name="name" placeholder="Имя *" value={formData.name} onChange={handleChange} required style={{ padding: '8px' }} />
          <input type="text" name="phone" placeholder="Телефон" value={formData.phone} onChange={handleChange} style={{ padding: '8px' }} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={{ padding: '8px' }} />
          <input type="text" name="company" placeholder="Компания" value={formData.company} onChange={handleChange} style={{ padding: '8px' }} />
          <button type="submit">Добавить</button>
        </div>
      </form>

      {/* Таблица клиентов */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#eee', textAlign: 'left' }}>
            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>ID</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Имя</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Телефон</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Email</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Компания</th>
          </tr>
        </thead>
        <tbody>
          {clients.length === 0 ? (
            <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Клиентов пока нет</td></tr>
          ) : (
            clients.map(client => (
              <tr key={client.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{client.id}</td>
                <td style={{ padding: '10px' }}>{client.name}</td>
                <td style={{ padding: '10px' }}>{client.phone}</td>
                <td style={{ padding: '10px' }}>{client.email}</td>
                <td style={{ padding: '10px' }}>{client.company}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Clients;