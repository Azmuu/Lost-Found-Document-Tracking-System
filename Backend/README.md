# FoundLink Backend API

REST API for the Lost & Found Document Tracking System.

## Setup

1. Copy environment file:
   ```bash
   cp .env.example .env
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start MongoDB locally or set `MONGODB_URI` in `.env`.

4. Seed default admin user:
   ```bash
   npm run seed
   ```

5. Run the server:
   ```bash
   npm run dev
   ```

API base URL: `http://localhost:5000/api`

## API Endpoints

### Auth (`/api/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user |
| POST | `/login` | Login |
| GET | `/me` | Get current user (protected) |
| POST | `/forgot-password` | Request password reset |
| PUT | `/reset-password/:token` | Reset password |
| PUT | `/change-password` | Change password (protected) |

### Documents (`/api/documents`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/search` | Search verified documents (public) |
| GET | `/types` | List document types |
| POST | `/` | Upload found document (protected) |
| GET | `/my` | Get user's uploads (protected) |
| GET | `/:id` | Get document by ID (protected) |
| PUT | `/:id` | Update document (protected) |
| DELETE | `/:id` | Delete document (protected) |

### Claims (`/api/claims`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/document/:documentId` | Submit claim |
| GET | `/my` | Get user's claims |
| GET | `/:id` | Get claim details |
| PUT | `/:id/cancel` | Cancel claim |

### Notifications (`/api/notifications`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | List notifications |
| PUT | `/read-all` | Mark all as read |
| PUT | `/:id/read` | Mark one as read |
| DELETE | `/:id` | Delete notification |

### Users (`/api/users`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/profile` | Update profile & avatar |
| GET | `/activity-logs` | Get activity history |

### Admin (`/api/admin`) — Admin only
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dashboard` | Dashboard analytics |
| GET | `/verification-queue` | Pending documents |
| PUT | `/documents/:id/verify` | Approve document |
| PUT | `/documents/:id/reject` | Reject document |
| GET | `/documents` | Manage all documents |
| PUT | `/privacy` | Privacy settings |
| GET | `/users` | Manage users |
| PUT | `/users/:id` | Update user role/status |
| GET | `/claims` | Manage claims |
| PUT | `/claims/:id` | Update claim status |
| GET | `/activity-logs` | System activity logs |

## Real-Time Notifications (Socket.IO)

Connect to the server with JWT token:

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  auth: { token: 'YOUR_JWT_TOKEN' }
});

socket.on('notification', (data) => {
  console.log('New notification:', data);
});
```

## Default Admin Credentials

- Email: `admin@foundlink.org`
- Password: `Admin@123456`

Change these in `.env` before running `npm run seed`.
