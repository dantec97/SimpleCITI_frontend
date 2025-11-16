// src/components/AdminAuditLogs.jsx
import { useEffect, useState } from 'react';
import { listAuditLogs } from '../api/api';

export default function AdminAuditLogs({ token }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    listAuditLogs(token).then(setLogs);
  }, [token]);

  return (
    <div>
      <h2>Audit Logs</h2>
      <ul>
        {logs.map(log => (
          <li key={log.id}>
            {log.timestamp}: {log.user?.username} - {log.action} ({log.details})
          </li>
        ))}
      </ul>
    </div>
  );
}