import { useState } from 'react';
import { setupMfa, verifyMfa } from '../api/api';
import "../Styles/Styles.css";

export default function MfaSetup({ token, onMfaEnabled }) {
  const [qr, setQr] = useState(null);
  const [secret, setSecret] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSetup() {
    setError('');
    const resp = await setupMfa(token);
    if (resp.qr_code && resp.secret) {
      setQr(resp.qr_code);
      setSecret(resp.secret);
    } else if (resp.error) {
      setError(resp.error);
    }
  }

  async function handleVerify(e) {
    e.preventDefault();
    setError('');
    const resp = await verifyMfa(token, code);
    if (resp.message) {
      setSuccess(resp.message);
      onMfaEnabled();
    } else if (resp.error) {
      setError(resp.error);
    }
  }

  return (
    <div className="mfa-setup-container">
      <h2>Set Up MFA</h2>
      {!qr && (
        <button onClick={handleSetup}>Generate QR Code</button>
      )}
      {qr && (
        <div style={{width: "100%"}}>
          <p>Scan this QR code with your authenticator app:</p>
          <img src={qr} alt="MFA QR Code" style={{ width: 200, height: 200 }} />
          <p>Or enter this secret manually: <b>{secret}</b></p>
          <form onSubmit={handleVerify}>
            <input
              placeholder="Enter code from app"
              value={code}
              onChange={e => setCode(e.target.value)}
              required
            />
            <button type="submit">Verify</button>
          </form>
        </div>
      )}
      {error && <div className="si-error">{error}</div>}
      {success && <div className="si-success">{success}</div>}
    </div>
  );
}