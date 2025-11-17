import { useState } from 'react';
import { disableMfa } from '../api/api';
import "../Styles/Styles.css";

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
    <div className="si-modal">
      <button className="si-modal-close" onClick={onClose}>×</button>
      <h3 className="si-section-title">User Profile Settings</h3>
      <div style={{ marginBottom: '20px' }}>
        <h4>Disable MFA</h4>
        <p>Enter your current MFA code to disable multi-factor authentication:</p>
        <form onSubmit={handleDisableMfa}>
          <input className="si-input" placeholder="MFA Code" value={mfaCode} onChange={e => setMfaCode(e.target.value)} required />
          <button className="si-btn" type="submit" style={{marginTop: 8}}>Disable MFA</button>
        </form>
      </div>
      {error && <div className="si-error">{error}</div>}
      {success && <div className="si-success">{success}</div>}
    </div>
  );
}