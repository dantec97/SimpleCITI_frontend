import { useState } from 'react';
import { createUser } from '../api/api';

export default function AdminPanel({ token }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleCreateUser(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    
    try {
      const data = await createUser(token, { username, password, email });
      if (data.message) {
        setMessage(`User "${username}" created successfully!`);
        setUsername('');
        setPassword('');
        setEmail('');
      } else if (data.error) {
        setError(data.error);
      }
    } catch (err) {
      setError('Error creating user');
    }
  }

  return (
    <div style={{ border: '2px solid #007bff', padding: '20px', margin: '20px 0', borderRadius: '8px' }}>
      <h2>🔧 Admin Panel</h2>
      
      <form onSubmit={handleCreateUser} style={{ marginBottom: '20px' }}>
        <h3>Create New User</h3>
        <div style={{ marginBottom: '10px' }}>
          <input 
            placeholder="Username" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            required 
            style={{ marginRight: '10px', padding: '8px' }}
          />
          <input 
            placeholder="Email" 
            type="email"
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            style={{ marginRight: '10px', padding: '8px' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            style={{ marginRight: '10px', padding: '8px' }}
          />
          <button type="submit" style={{ padding: '8px 16px' }}>Create User</button>
        </div>
      </form>
      
      {message && <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
    </div>
  );
}