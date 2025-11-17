// src/components/DocumentList.jsx
import { useEffect, useState } from 'react';
import { listDocuments } from '../api/api';
import DocumentHistory from './DocumentHistory';
import "../Styles/Styles.css";

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
    <div className="si-container">
      <h2 className="si-section-title">Your Documents</h2>
      <ul className="si-list">
        {docs.map(doc => (
          <li key={doc.id} className="si-list-item">
            <div>
              <strong>{doc.name}</strong> (v{doc.version}) - {doc.doc_type}
              <br />
              <small>Uploaded: {new Date(doc.uploaded_at).toLocaleString()}</small>
            </div>
            <div>
              <button className="si-btn" style={{width: 'auto', marginRight: 10, padding: '7px 18px'}} onClick={() => handleDownload(doc.id)}>Download</button>
              <button className="si-btn" style={{width: 'auto', background: '#282b5c', color: '#fff', padding: '7px 18px'}} onClick={() => setSelectedDoc(doc)}>History</button>
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