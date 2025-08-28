# Admin Panel Backend API Documentation

## Overview
This is a secure admin panel backend built with NestJS, Prisma, and MongoDB. It supports two user roles: SUPERADMIN and ADMIN.

## 📖 Interactive Documentation
**Swagger UI is available at: `http://localhost:4000/docs`**

The Swagger documentation provides:
- Interactive API testing
- Detailed request/response schemas
- Authentication integration
- Real-time validation
- Example payloads

For detailed Swagger usage instructions, see [SWAGGER_GUIDE.md](./SWAGGER_GUIDE.md).

## Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="mongodb://localhost:27017/infra-backend"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="24h"

# SuperAdmin Credentials
SUPERADMIN_EMAIL="superadmin@admin.com"
SUPERADMIN_PASSWORD="SuperAdmin@123"
SUPERADMIN_NAME="Super Administrator"

# Application
PORT=4000
NODE_ENV="development"
```

## Quick Start

1. Install dependencies:
```bash
yarn install
```

2. Set up your environment variables in `.env` file

3. Start MongoDB (if running locally)

4. Generate Prisma client:
```bash
npx prisma generate
```

5. Push schema to database:
```bash
npx prisma db push
```

6. Start the application:
```bash
yarn start:dev
```

The superadmin user will be automatically created on startup.

## API Endpoints

### Authentication

#### POST /auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "superadmin@admin.com",
  "password": "SuperAdmin@123"
}
```

**Response:**
```json
{
  "access_token": "jwt_token_here",
  "admin": {
    "id": "admin_id",
    "email": "superadmin@admin.com",
    "name": "Super Administrator",
    "role": "SUPERADMIN"
  }
}
```

### Admin Management

All admin endpoints require authentication via Bearer token.

#### GET /admin
Get all admins (SUPERADMIN only)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### POST /admin
Create a new admin (SUPERADMIN only)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@admin.com",
  "password": "SecurePassword123"
}
```

#### GET /admin/profile
Get current user's profile

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### GET /admin/:id
Get admin by ID (SUPERADMIN can view any, ADMIN can only view their own)

**Headers:**
```
Authorization: Bearer <jwt_token>
```



#### DELETE /admin/:id
Delete admin with superadmin password confirmation (SUPERADMIN only)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "superAdminPassword": "SuperAdmin@123"
}
```

## Security Features

1. **Role-Based Access Control**: SUPERADMIN and ADMIN roles with different permissions
2. **Password Hashing**: All passwords are hashed using bcrypt
3. **JWT Authentication**: Secure token-based authentication
4. **Delete Confirmation**: Requires superadmin password to delete users
5. **Self-Protection**: Users cannot delete themselves
6. **SuperAdmin Protection**: SuperAdmin accounts cannot be deleted
7. **Email Uniqueness**: Enforced at database level
8. **Input Validation**: All inputs are validated using class-validator

## User Roles

### SUPERADMIN
- Create new admins
- View all admins
- Delete any admin (except self and other superadmins)
- View any admin profile

### ADMIN
- View own profile
- Cannot create, update, delete, or view other admins

## Data Models

### Admin
```typescript
{
  id: string;          // MongoDB ObjectId
  email: string;       // Unique email address
  name: string;        // Full name
  password: string;    // Hashed password
  role: UserRole;      // SUPERADMIN or ADMIN
  createdAt: Date;     // Creation timestamp
  updatedAt: Date;     // Last update timestamp
}
```

### UserRole Enum
```typescript
enum UserRole {
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN"
}
```

## Homepage Content Management

The Homepage Content Management API provides flexible content management for your website's homepage sections.

### Base URL
```
/content/home
```

### Endpoints

#### GET /content/home
Get all homepage sections (public)

#### GET /content/home/:key
Get a specific homepage section by key (public)

#### PATCH /content/home/:key
Update a homepage section completely (ADMIN/SUPERADMIN)

#### PATCH /content/home/:key/fields
Update specific fields in a homepage section (ADMIN/SUPERADMIN)

#### PATCH /content/home/:key/toggle
Toggle section active status (ADMIN/SUPERADMIN)

#### DELETE /content/home/:key
Delete a homepage section (ADMIN/SUPERADMIN)

### HomepageSection Model
```typescript
{
  id: string;          // MongoDB ObjectId
  sectionKey: string;  // Unique identifier for the section
  data: object;        // Flexible JSON data for the section
  active: boolean;     // Whether the section is active
  createdAt: Date;     // Creation timestamp
  updatedAt: Date;     // Last update timestamp
}
```

**Note:** For detailed documentation and examples, see [HOMEPAGE_CONTENT_API.md](./HOMEPAGE_CONTENT_API.md)

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400 Bad Request`: Invalid input or missing required fields
- `401 Unauthorized`: Invalid or missing authentication token
- `403 Forbidden`: Insufficient permissions for the requested action
- `404 Not Found`: Requested resource not found
- `409 Conflict`: Resource already exists (duplicate email)
- `500 Internal Server Error`: Server-side error

## Development

### Generate Prisma Client
```bash
npx prisma generate
```

### Apply Schema Changes
```bash
npx prisma db push
```

### View Database
```bash
npx prisma studio
```

### Run Tests
```bash
yarn test
```

### Linting
```bash
yarn lint
```
