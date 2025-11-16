import { useState } from 'react';
import LoginPage from './components/LoginPage';
import DocumentList from './components/DocumentList';
import DocumentUpload from './components/DocumentUpload';
import AdminAuditLogs from './components/AdminAuditLogs';
import MfaSetup from './components/MfaSetup';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [mfaEnabled, setMfaEnabled] = useState(
    localStorage.getItem('mfa_enabled') === 'true'
  );
  const [isAdmin, setIsAdmin] = useState(false);

  function handleLogin(token, mfa_enabled) {
    setToken(token);
    setMfaEnabled(mfa_enabled);
    localStorage.setItem('token', token);
    localStorage.setItem('mfa_enabled', mfa_enabled);
    // Optionally, fetch user profile to check admin status
    // setIsAdmin(...);
  }

  function handleLogout() {
    setToken(null);
    setMfaEnabled(false);
    localStorage.removeItem('token');
    localStorage.removeItem('mfa_enabled');
  }

  if (!token) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (!mfaEnabled) {
    return (
      <div>
        <button onClick={handleLogout}>Logout</button>
        <MfaSetup token={token} onMfaEnabled={() => setMfaEnabled(true)} />
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <DocumentUpload token={token} onUpload={() => {}} />
      <DocumentList token={token} />
      {isAdmin && <AdminAuditLogs token={token} />}
    </div>
  );
}

export default App;