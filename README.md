# HouseHive 🏠

A full-stack house rental platform where hosts can list properties and renters can browse, view details, and book stays — with JWT-based authentication and image uploads.

## Features

- **User authentication** — signup/login with bcrypt password hashing and JWT-based sessions
- **Property listings** — create listings with title, description, price, location, and photos
- **Image uploads** — multi-file property image upload via Multer
- **Booking system** — date-range booking with automatic overlap/double-booking prevention (Postgres `OVERLAPS`)
- **Protected routes** — both frontend (React Router guards) and backend (JWT middleware) restrict actions to logged-in users
- **Dashboard** — logged-in users can view their bookings

## Tech Stack

**Frontend:** React (Vite), React Router, Axios, Context API for auth state
**Backend:** Node.js, Express
**Database:** PostgreSQL
**Auth:** JWT (jsonwebtoken), bcrypt
**File uploads:** Multer

## Project Structure

```
HouseHive/
├── backend/
│   ├── controllers/     # Route logic (auth, users, properties, bookings)
│   ├── db/               # PostgreSQL connection pool
│   ├── middleware/       # JWT auth middleware, Multer upload config
│   ├── routes/           # Express route definitions
│   ├── uploads/          # Uploaded property images
│   ├── schema.sql        # Database schema
│   └── server.js         # Entry point
├── src/                  # React frontend (pages, components, context, api)
└── ...
```

## Database Schema

Five core tables: `users`, `properties`, `property_images`, `bookings`, `reviews` (reviews table exists in schema; routes not yet implemented).

Key design choices:
- Single `users` table with a `role` column (`renter`, `host`, `admin`) rather than separate host/renter tables
- Booking overlap prevention enforced at the database level using Postgres's `OVERLAPS` operator
- Foreign keys with `ON DELETE CASCADE` to prevent orphaned records

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=house_rental_dev
DB_PASSWORD=your_password
DB_PORT=5432
PORT=5000
JWT_SECRET=your_random_secret
```

Create the database and run the schema:
```bash
psql -U postgres -d house_rental_dev -f schema.sql
```

Start the server:
```bash
node server.js
```

### Frontend Setup

```bash
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` (or next available port) and expects the backend running on `http://localhost:5000`.

## API Overview

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|----------------|
| POST | `/api/users/register` | Create a new user | No |
| POST | `/api/users/login` | Log in, receive JWT | No |
| GET | `/api/properties` | List all properties | No |
| GET | `/api/properties/:id` | Get one property | No |
| POST | `/api/properties` | Create a property | Yes |
| POST | `/api/properties/:id/images` | Upload property images | No* |
| POST | `/api/bookings` | Create a booking | Yes |
| GET | `/api/bookings/renter/:renterId` | Get bookings for a renter | No |
| GET | `/api/bookings/property/:propertyId` | Get bookings for a property | No |

*Image upload auth protection is a known gap — see Roadmap below.

## Known Limitations / Roadmap

This is an actively developed portfolio project. Not yet implemented:
- Update/delete for properties and bookings
- Reviews (schema exists, routes pending)
- Role-based restrictions (e.g. only hosts should create listings)
- Ownership checks (e.g. preventing users from modifying others' bookings)
- Search/filter on property listings
- Cloud deployment (planned: AWS ECS Fargate + RDS + Terraform)

## Author

Built by Vaibhav Singh Rawat — [github.com/Max-out-00](https://github.com/Max-out-00)
