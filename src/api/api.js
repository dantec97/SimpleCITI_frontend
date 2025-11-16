// src/api/api.js
const API_BASE = 'http://localhost:8000/api';
// const API_BASE = 'http://127.0.0.1:8000/api';

export async function loginWithMfa(username, password, mfa_code) {
  const res = await fetch(`${API_BASE}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, mfa_code }),
  });
  return res.json();
}

export async function listDocuments(token) {
  const res = await fetch(`${API_BASE}/documents/`, {
    headers: { Authorization: `Token ${token}` },
  });
  return res.json();
}

export async function uploadDocument(token, formData) {
  const res = await fetch(`${API_BASE}/documents/`, {
    method: 'POST',
    headers: { Authorization: `Token ${token}` },
    body: formData,
  });
  return res.json();
}

export async function listAuditLogs(token) {
  const res = await fetch(`${API_BASE}/auditlogs/`, {
    headers: { Authorization: `Token ${token}` },
  });
  return res.json();
}

export async function setupMfa(token) {
  const res = await fetch(`${API_BASE}/investors/mfa/setup/`, {
    method: 'POST',
    headers: { Authorization: `Token ${token}` },
  });
  return res.json();
}

export async function verifyMfa(token, code) {
  const res = await fetch(`${API_BASE}/investors/mfa/verify/`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });
  return res.json();
}