// src/components/DocumentUpload.jsx
import { useState } from 'react';
import { uploadDocument } from '../api/api';
import "../Styles/Styles.css";

export default function DocumentUpload({ token, onUpload }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [docType, setDocType] = useState('other');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('doc_type', docType);
    await uploadDocument(token, formData);
    setSuccess('Document uploaded!');
    setFile(null);
    setName('');
    setDocType('other');
    onUpload();
  }

  return (
    <form className="si-container" onSubmit={handleSubmit}>
      <h3 className="si-section-title">Upload Document</h3>
      <input className="si-input" placeholder="Document Name" value={name} onChange={e => setName(e.target.value)} required />
      <select className="si-select" value={docType} onChange={e => setDocType(e.target.value)}>
        <option value="id">ID</option>
        <option value="statement">Statement</option>
        <option value="agreement">Agreement</option>
        <option value="other">Other</option>
      </select>
      <input className="si-input" type="file" onChange={e => setFile(e.target.files[0])} required />
      <button className="si-btn" type="submit">Upload</button>
      {success && <div className="si-success">{success}</div>}
    </form>
  );
}