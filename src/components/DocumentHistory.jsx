import { useState } from 'react';
import { getDocumentHistory } from '../api/api';

export default function DocumentHistory({ token, docId, docName, onClose }) {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadHistory() {
    setLoading(true);
    try {
      const data = await getDocumentHistory(token, docId);
      setHistory(data);
    } catch (err) {
      console.error('Error loading history:', err);
    }
    setLoading(false);
  }

  if (!history && !loading) {
    loadHistory();
  }

  const handleDownloadVersion = async (versionId) => {
    const res = await fetch(`http://localhost:8000/api/documents/${versionId}/download/`, {
      headers: { Authorization: `Token ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      const link = document.createElement('a');
      link.href = data.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Failed to get download link for version');
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)',
      background: 'white', 
      border: '2px solid #ccc', 
      padding: '20px', 
      borderRadius: '8px',
      maxWidth: '600px',
      maxHeight: '400px',
      overflow: 'auto',
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3>Version History: {docName}</h3>
        <button onClick={onClose} style={{ background: 'red', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px' }}>×</button>
      </div>
      
      {loading && <p>Loading history...</p>}
      
      {history && (
        <div>
          <p>Total versions: {history.total_versions}</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {history.versions.map(version => (
              <li key={version.id} style={{ 
                border: '1px solid #ddd', 
                margin: '10px 0', 
                padding: '10px', 
                borderRadius: '4px' 
              }}>
                <strong>Version {version.version}</strong> - {version.doc_type}
                <br />
                <small>Uploaded: {new Date(version.uploaded_at).toLocaleString()}</small>
                <br />
                <button onClick={() => handleDownloadVersion(version.id)}>Download v{version.version}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}