# RRGBS – Reliable People, Professional Services

RRGBS (RR Group of Business Solutions) is a full-stack web platform that brings together professional business services and a recruitment/job portal in one application.

The platform provides:

- Business and workforce services
- Job searching
- Candidate registration and login
- Recruiter registration and login
- Job posting
- Job applications
- Resume uploads and downloads
- Recruiter job management
- Password reset functionality
- Contact and enquiry forms
- Responsive modern UI with animations

---

## Features

### Main Website

- Professional RRGBS landing page
- Company information
- Business services
- Capabilities and industries
- Contact/enquiry section
- Responsive navigation
- Smooth page transitions and animations

### Jobs Portal

- Search and browse jobs
- Search by:
  - Job title
  - Skills
  - Company
  - Location
  - Job type
- Popular job categories
- Candidate authentication
- Recruiter authentication
- Job posting
- Job applications
- Resume upload
- Recruiter portal
- Applicant count
- Resume download
- Protected recruiter functionality

### Authentication

- Candidate registration
- Recruiter registration
- Login
- Logout
- JWT-based authentication
- Password hashing
- Forgot password
- Password reset using email verification code
- Protected API routes

### Recruiter Features

Recruiters can:

- Complete recruiter verification
- Create job postings
- View their own posted jobs
- See applicant counts
- View applicants
- Download candidate resumes

Candidates cannot create job postings.

### UI & Animations

- Responsive design
- Jobs portal hero animations
- Services portal hero animations
- Page transition animations
- Section reveal animations
- Button and card interactions
- Reduced-motion accessibility support

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide Icons

### Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt/password hashing
- Nodemailer

### Development

- npm
- TypeScript
- Vite development server

---

## 📁 Project Structure

```text
RRGBS/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── api.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
│
├── server/
│   ├── storage/
│   ├── uploads/
│   └── ...
│
├── scripts/
│
├── .env.example
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
