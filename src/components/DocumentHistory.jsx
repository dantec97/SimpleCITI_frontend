import { useState } from 'react';
import { getDocumentHistory } from '../api/api';
import "../Styles/Styles.css";


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
    <div className="si-modal">
      <button className="si-modal-close" onClick={onClose}>×</button>
      <h3 className="si-section-title">Version History: {docName}</h3>
      {loading && <p>Loading history...</p>}
      {history && (
        <div>
          <p>Total versions: {history.total_versions}</p>
          <ul className="si-list">
            {history.versions.map(version => (
              <li key={version.id} className="si-list-item" style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <div>
                  <strong>Version {version.version}</strong> - {version.doc_type}
                  <br />
                  <small>Uploaded: {new Date(version.uploaded_at).toLocaleString()}</small>
                </div>
                <button className="si-btn" style={{width: 'auto', marginTop: 8, padding: '7px 18px'}} onClick={() => handleDownloadVersion(version.id)}>
                  Download v{version.version}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}