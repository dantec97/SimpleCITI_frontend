// src/components/LoginPage.jsx
import { useState } from 'react';
import { loginWithMfa } from '../api/api';

export default function LoginPage({ onLogin, onMfaSetup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [mfaRequired, setMfaRequired] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const resp = await loginWithMfa(username, password, mfaRequired ? mfaCode : undefined);

    if (resp.token) {
      // User is authenticated, may or may not have MFA enabled
      onLogin(resp.token, resp.mfa_enabled);
    } else if (resp.mfa_required) {
      // User has MFA enabled, prompt for code
      setMfaRequired(true);
    } else if (resp.error) {
      setError(resp.error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      {mfaRequired && (
        <input placeholder="MFA Code" value={mfaCode} onChange={e => setMfaCode(e.target.value)} required />
      )}
      <button type="submit">Login</button>
      {error && <div style={{color: 'red'}}>{error}</div>}
    </form>
  );
}