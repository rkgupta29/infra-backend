# Admin Panel Backend Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- MongoDB (local or cloud instance)

## Quick Setup

### 1. Install Dependencies
```bash
yarn install
```

### 2. Environment Configuration
Copy the template and create your environment file:

```bash
# Copy the template
cp env.template .env
```

Or manually create a `.env` file in the root directory with the following variables:

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
PORT=3000
NODE_ENV="development"
```

### 3. Database Setup
```bash
# Generate Prisma client
yarn prisma:generate

# Push schema to database
yarn prisma:push
```

### 4. Start the Application
```bash
# Development mode with hot reload
yarn start:dev

# Or production mode
yarn start:prod
```

### 5. Verify Setup
The application will automatically create the superadmin user on startup. You should see:
```
🚀 Admin Panel Backend running on port 3000
📚 Environment: development
```

## Testing the API

### Login as SuperAdmin
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "superadmin@admin.com",
    "password": "SuperAdmin@123"
  }'
```

### Create a New Admin
```bash
# First, get the JWT token from login response, then:
curl -X POST http://localhost:3000/admin \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "John Doe",
    "email": "john@admin.com",
    "password": "SecurePassword123"
  }'
```

## Available Scripts

- `yarn start:dev` - Start development server with hot reload
- `yarn build` - Build for production
- `yarn start:prod` - Start production server
- `yarn lint` - Run ESLint
- `yarn test` - Run tests
- `yarn prisma:generate` - Generate Prisma client
- `yarn prisma:push` - Push schema to database
- `yarn prisma:studio` - Open Prisma Studio
- `yarn prisma:reset` - Reset database and apply schema

## Security Features

✅ **Password Hashing** - All passwords are hashed using bcrypt  
✅ **JWT Authentication** - Secure token-based authentication  
✅ **Role-Based Access Control** - SUPERADMIN and ADMIN roles  
✅ **Delete Confirmation** - Requires exact confirmation text to delete users  
✅ **Self-Protection** - Users cannot delete themselves  
✅ **SuperAdmin Protection** - SuperAdmin accounts cannot be deleted  
✅ **Input Validation** - All inputs are validated using class-validator  
✅ **CORS Configuration** - Configurable CORS settings  

## API Documentation

See `API_DOCUMENTATION.md` for detailed API endpoint documentation.

## Troubleshooting

### Prisma Generate Issues
If you encounter permission errors with Prisma generate on Windows:
1. Close all editors/IDEs
2. Run the command again
3. Or restart your development server

### Database Connection Issues
- Ensure MongoDB is running
- Check the DATABASE_URL in your .env file
- Verify database name and connection string

### Port Already in Use
Change the PORT in your .env file or stop the process using the port.
