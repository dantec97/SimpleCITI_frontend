<div align="center">

# Secure-Investor Frontend

**A modern React frontend for Secure-Investor: Secure, auditable, and user-friendly document management for regulated industries.**

</div>

---

## 🚀 Demo

### Admin Flow  
<img src="Assets/Admin_create_user_flow.gif" alt="Admin creates user" width="600"/>

### User Flow  
<img src="Assets/User_flow.gif" alt="User login and MFA" width="600"/>

### Admin: Documents View  
<img src="Assets/admin_docs.png" alt="Admin documents view" width="600"/>

### Admin: Audit Logs  
<img src="Assets/admin_audit_logs.png" alt="Admin audit logs" width="600"/>

### AWS S3 Storage Example  
<img src="Assets/aws_s3_screenshot.png" alt="AWS S3 Screenshot" width="600"/>

---

## ✨ Features

- **Admin User Management:**  
  Admins create investor accounts (no open registration). Each user gets an InvestorProfile.
- **Multi-Factor Authentication (MFA):**  
  Users must set up MFA on first login (QR code + TOTP). MFA is required for all logins.
- **Secure Document Management:**  
  Investors upload documents (ID, statements, agreements, etc).  
  Each upload is versioned; previous versions are preserved.  
  Documents are stored securely in AWS S3.  
  Users can view and download current and previous versions.
- **Audit Logging:**  
  All sensitive actions (login, MFA, upload, download, etc) are logged.  
  Admins can view audit logs.
- **Admin Panel:**  
  Admins can view and manage users, documents, and logs.
- **Modern UI/UX:**  
  Responsive, dark-themed design with blue accent.  
  Clear feedback for all actions.  
  Consistent, accessible styling across all pages.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, React Router, Fetch API
- **Styling:** Custom CSS (`src/Styles/Styles.css`)
- **Backend:** [Secure-Investor Django API](https://github.com/your-org/secure-investor-backend) (required)
- **Storage:** AWS S3 (for documents)
- **Auth:** Django Token Auth + TOTP MFA

---

## ⚡ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Access to the Secure-Investor Django backend (running locally or remotely)

### Installation

```bash
git clone https://github.com/your-org/secure-investor-frontend.git
cd secure-investor-frontend
npm install
# or
yarn install