import { useState } from 'react';
import { disableMfa } from '../api/api';

export default function UserProfile({ token, onClose, onMfaDisabled }) {
  const [mfaCode, setMfaCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleDisableMfa(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const data = await disableMfa(token, mfaCode);
      if (data.message) {
        setSuccess(data.message);
        setTimeout(() => {
          onMfaDisabled();
          onClose();
        }, 2000);
      } else if (data.error) {
        setError(data.error);
      }
    } catch (err) {
      setError('Error disabling MFA');
    }
  }

  return (
    <div style={{ 
      position: 'fixed', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)',
      background: 'white', 
      border: '2px solid #ccc', 
      padding: '20px', 
      borderRadius: '8px',
      minWidth: '400px',
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3>User Profile Settings</h3>
        <button onClick={onClose} style={{ background: 'red', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px' }}>×</button>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>Disable MFA</h4>
        <p>Enter your current MFA code to disable multi-factor authentication:</p>
        <form onSubmit={handleDisableMfa}>
          <input 
            placeholder="MFA Code" 
            value={mfaCode} 
            onChange={e => setMfaCode(e.target.value)} 
            required 
            style={{ marginRight: '10px', padding: '8px' }}
          />
          <button type="submit" style={{ padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>
            Disable MFA
          </button>
        </form>
      </div>
      
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
    </div>
  );
}