import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import DocumentList from './components/DocumentList';
import DocumentUpload from './components/DocumentUpload';
import AdminAuditLogs from './components/AdminAuditLogs';
import AdminPanel from './components/AdminPanel';
import UserProfile from './components/UserProfile';
import MfaSetup from './components/MfaSetup';
import { getProfile } from './api/api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [mfaEnabled, setMfaEnabled] = useState(
    localStorage.getItem('mfa_enabled') === 'true'
  );
  const [isAdmin, setIsAdmin] = useState(false);
  const [docRefresh, setDocRefresh] = useState(0);
  const [showProfile, setShowProfile] = useState(false);

  // Check admin status on login
  useEffect(() => {
    if (token && mfaEnabled) {
      checkAdminStatus();
    }
  }, [token, mfaEnabled]);

  async function checkAdminStatus() {
    try {
      await getProfile(token);
      setIsAdmin(true);
    } catch {
      setIsAdmin(false);
    }
  }

  function handleLogin(token, mfa_enabled) {
    setToken(token);
    setMfaEnabled(mfa_enabled);
    localStorage.setItem('token', token);
    localStorage.setItem('mfa_enabled', mfa_enabled);
  }

  function handleLogout() {
    setToken(null);
    setMfaEnabled(false);
    setIsAdmin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('mfa_enabled');
  }

  function handleMfaEnabled() {
    setMfaEnabled(true);
    localStorage.setItem('mfa_enabled', 'true');
  }

  function handleMfaDisabled() {
    setMfaEnabled(false);
    localStorage.setItem('mfa_enabled', 'false');
  }

  // If not logged in, show login
  if (!token) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // If MFA not enabled, show MFA setup
  if (!mfaEnabled) {
    return (
      <div>
        <button onClick={handleLogout}>Logout</button>
        <MfaSetup token={token} onMfaEnabled={handleMfaEnabled} />
      </div>
    );
  }

  // Main app with routing
  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          borderBottom: '2px solid #007bff',
          paddingBottom: '10px',
        }}>
          <h1>🔒 SecureInvestor Portal</h1>
          <nav style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <Link to="/documents" style={{ color: '#007bff', textDecoration: 'none' }}>Documents</Link>
            {isAdmin && <Link to="/admin" style={{ color: '#007bff', textDecoration: 'none' }}>Admin</Link>}
            {isAdmin && <Link to="/audit-logs" style={{ color: '#007bff', textDecoration: 'none' }}>Audit Logs</Link>}
            <button onClick={() => setShowProfile(true)} style={{ marginRight: '10px', padding: '8px 16px' }}>
              Profile Settings
            </button>
            <button onClick={handleLogout} style={{
              padding: '8px 16px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
            }}>
              Logout
            </button>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/documents" replace />} />
          <Route path="/documents" element={
            <div>
              <DocumentUpload token={token} onUpload={() => setDocRefresh(r => r + 1)} />
              <DocumentList token={token} refresh={docRefresh} />
            </div>
          } />
          {isAdmin && <Route path="/admin" element={<AdminPanel token={token} />} />}
          {isAdmin && <Route path="/audit-logs" element={<AdminAuditLogs token={token} />} />}
        </Routes>

        {showProfile && (
          <UserProfile
            token={token}
            onClose={() => setShowProfile(false)}
            onMfaDisabled={handleMfaDisabled}
          />
        )}
      </div>
    </Router>
  );
}

export default App;