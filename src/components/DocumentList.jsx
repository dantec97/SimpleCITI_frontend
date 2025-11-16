// src/components/DocumentList.jsx
import { useEffect, useState } from 'react';
import { listDocuments } from '../api/api';

export default function DocumentList({ token }) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    listDocuments(token).then(setDocs);
  }, [token]);

  return (
    <div>
      <h2>Your Documents</h2>
      <ul>
        {docs.map(doc => (
          <li key={doc.id}>
            {doc.name} (v{doc.version}) - {doc.doc_type}
            <a href={`http://localhost:8000${doc.file}`} target="_blank" rel="noopener noreferrer">Download</a>
          </li>
        ))}
      </ul>
    </div>
  );
}