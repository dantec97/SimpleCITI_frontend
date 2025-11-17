// src/components/DocumentList.jsx
import { useEffect, useState } from 'react';
import { listDocuments } from '../api/api';
import DocumentHistory from './DocumentHistory';

export default function DocumentList({ token, refresh }) {
  const [docs, setDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    listDocuments(token).then(setDocs);
  }, [token, refresh]);

  // Download handler
  const handleDownload = async (docId) => {
    const res = await fetch(`http://localhost:8000/api/documents/${docId}/download/`, {
      headers: { Authorization: `Token ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      // data.url should be the presigned S3 URL or file URL
      const link = document.createElement('a');
      link.href = data.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Failed to get download link.');
    }
  };

  return (
    <div>
      <h2>Your Documents</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {docs.map(doc => (
          <li key={doc.id} style={{ 
            border: '1px solid #ddd', 
            margin: '10px 0', 
            padding: '15px', 
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <strong>{doc.name}</strong> (v{doc.version}) - {doc.doc_type}
              <br />
              <small>Uploaded: {new Date(doc.uploaded_at).toLocaleString()}</small>
            </div>
            <div>
              <button
                onClick={() => handleDownload(doc.id)}
                style={{ marginRight: '10px', color: '#007bff', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Download
              </button>
              <button 
                onClick={() => setSelectedDoc(doc)} 
                style={{ background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px' }}
              >
                History
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      {selectedDoc && (
        <DocumentHistory 
          token={token} 
          docId={selectedDoc.id} 
          docName={selectedDoc.name}
          onClose={() => setSelectedDoc(null)} 
        />
      )}
    </div>
  );
}