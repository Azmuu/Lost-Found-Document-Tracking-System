# Lost & Found Document Tracking System (FoundLink)

**GitHub:** https://github.com/Azmuu/Lost-Found-Document-Tracking-System

A secure web platform where finders upload lost documents, owners search and claim them, admins verify records, and users receive real-time match notifications.

## Problem Statement

People lose important documents (IDs, passports, certificates, licenses). Recovery is difficult without a centralized, secure platform. FoundLink solves this with upload, search, admin verification, privacy protection, and notifications.

## System Entities

| Entity | Fields |
|--------|--------|
| **User** | User ID, Full Name, Email, Phone, Password, Role, Profile Image |
| **Document** | Document ID, User ID, Owner Name, Document Type, Document Number, Description, Document Photo, Status, Upload Date |
| **Notification** | Notification ID, User ID, Message, Status, Created Date |
| **Verification** | Verification ID, Document ID, Admin ID, Verification Status, Review Date |

## System Workflow

1. User registers an account
2. User logs into the system
3. Finder uploads a found document with image and details
4. System stores the document in MongoDB
5. Owner searches by name, document type, or keywords
6. System searches and compares available verified records
7. Matching results are displayed
8. User receives a notification if a match is found
9. Administrator verifies uploaded documents
10. Approved documents become available for recovery
11. Owner claims the document
12. Administrator monitors system activities

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, React Router, Axios, Lucide React
- **Backend:** Node.js, Express.js, JWT, bcryptjs, Multer, Cloudinary
- **Database:** MongoDB, Mongoose

## Quick Start

```bash
# Backend
cd Backend && npm install && npm run seed && npm run dev

# Frontend (new terminal)
cd Frontend && npm install && npm run dev
```

- Frontend: http://localhost:5173 (or 5174)
- Backend: http://localhost:5002 (see `Backend/.env` PORT)
- Admin: `admin@foundlink.org` / `Admin@123456`

Ensure `Frontend/.env` `VITE_API_PORT` matches `Backend/.env` `PORT`.

## Key Features

### User
Registration, login, JWT auth, profile management, upload documents with images, advanced search & filtering, view uploaded documents, notifications, responsive UI, dark/light mode

### Admin
Dashboard analytics, user management, document management, verification (approve/reject), claims management, activity logs, privacy protection

## Security

JWT authentication, bcrypt password hashing, protected routes, role-based authorization, admin verification, privacy masking, secure file uploads

## Project Structure

```
Backend/     Express API, models, controllers, Socket.IO
Frontend/    React SPA with dashboards and admin panel
```

See [Backend/README.md](Backend/README.md) for API endpoints.
