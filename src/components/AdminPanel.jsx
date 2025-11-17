import { useState } from 'react';
import { createUser } from '../api/api';
import "../Styles/Styles.css";

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
    <div className="si-container" style={{marginTop: 30}}>
      <h2 className="si-title">🔧 Admin Panel</h2>
      <form onSubmit={handleCreateUser} style={{ marginBottom: '20px' }}>
        <h3 className="si-section-title">Create New User</h3>
        <input className="si-input" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <input className="si-input" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="si-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="si-btn" type="submit">Create User</button>
      </form>
      {message && <div className="si-success">{message}</div>}
      {error && <div className="si-error">{error}</div>}
    </div>
  );
}