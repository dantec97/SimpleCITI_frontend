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
  const [needsMfaSetup, setNeedsMfaSetup] = useState(false);
  const [docRefresh, setDocRefresh] = useState(0);

  function handleLogin(token, mfa_enabled) {
    setToken(token);
    setMfaEnabled(mfa_enabled);
    localStorage.setItem('token', token);
    localStorage.setItem('mfa_enabled', mfa_enabled);
    setNeedsMfaSetup(false);
  }

  function handleLogout() {
    setToken(null);
    setMfaEnabled(false);
    setNeedsMfaSetup(false);
    localStorage.removeItem('token');
    localStorage.removeItem('mfa_enabled');
  }

  function handleMfaSetup(/* username, token */) {
    setNeedsMfaSetup(true);
  }

  if (!token && !needsMfaSetup) {
    return <LoginPage onLogin={handleLogin} onMfaSetup={handleMfaSetup} />;
  }

  if (needsMfaSetup && token) {
    return (
      <div>
        <button onClick={handleLogout}>Logout</button>
        <MfaSetup token={token} onMfaEnabled={() => setMfaEnabled(true)} />
      </div>
    );
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
      <DocumentUpload token={token} onUpload={() => setDocRefresh(r => r + 1)} />
      <DocumentList token={token} refresh={docRefresh} />
      {isAdmin && <AdminAuditLogs token={token} />}
    </div>
  );
}

export default App;