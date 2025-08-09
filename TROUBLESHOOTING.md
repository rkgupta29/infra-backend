# Troubleshooting Guide

## Common Issues and Solutions

### 1. Duplicate DTO Error
**Error**: `Duplicate DTO detected: "AdminResponseDto" is defined multiple times`

**Solution**: ✅ **FIXED**
- Removed duplicate `AdminResponseDto` from `src/auth/dto/login-response.dto.ts`
- Now using a single shared `AdminResponseDto` from `src/admin/dto/admin-response.dto.ts`
- The `LoginResponseDto` now imports the shared DTO

### 2. SuperAdmin Seeding Error
**Error**: `[SeederService] Failed to seed SuperAdmin`

**Solution**: ✅ **FIXED**
- Enhanced error handling in `SeederService`
- Added fallback default values for development
- Improved error messages with helpful guidance
- Added delay to ensure database is ready before seeding

**Root Causes**:
- Missing `.env` file with required environment variables
- Database connection issues
- Missing environment variables

### 3. Environment Variables Setup

**Problem**: Application needs environment variables to function properly.

**Solution**: 
1. **Copy the template**: 
   ```bash
   cp env.template .env
   ```

2. **Or create `.env` manually** with these variables:
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

### 4. Database Connection Issues

**Symptoms**:
- Seeding fails
- Prisma errors
- Connection timeout

**Solutions**:
1. **Ensure MongoDB is running**:
   ```bash
   # For local MongoDB
   mongod
   ```

2. **Check DATABASE_URL**:
   - Verify the connection string format
   - Ensure database name is correct
   - Check port number (default: 27017)

3. **Test connection**:
   ```bash
   yarn prisma:generate
   yarn prisma:push
   ```

### 5. Prisma Generation Issues

**Error**: `EPERM: operation not permitted, rename`

**Solutions**:
1. **Close all editors/IDEs**
2. **Restart the terminal**
3. **Try again**:
   ```bash
   yarn prisma:generate
   ```

### 6. TypeScript Import Errors

**Error**: `Module has no exported member 'UserRole'`

**Solution**: ✅ **FIXED**
- Now using Prisma-generated `UserRole` enum consistently
- All imports use `import { UserRole } from '@prisma/client'`

### 7. Swagger UI Not Loading

**Solutions**:
1. **Check application is running**:
   ```bash
   yarn start:dev
   ```

2. **Access correct URL**:
   ```
   http://localhost:3000/docs
   ```

3. **Check console for errors**
4. **Verify port is not in use**

### 8. JWT Authentication Issues

**Problems**:
- Token not working
- Authorization fails
- 401 Unauthorized

**Solutions**:
1. **Check JWT_SECRET** in `.env`
2. **Verify token format**: `Bearer <token>`
3. **Check token expiration**
4. **Use correct endpoint** for login: `POST /auth/login`

## Setup Verification Checklist

✅ **Dependencies installed**: `yarn install`
✅ **Environment variables set**: `.env` file created
✅ **Database running**: MongoDB accessible
✅ **Prisma client generated**: `yarn prisma:generate`
✅ **Database schema applied**: `yarn prisma:push`
✅ **Application builds**: `yarn build`
✅ **Application starts**: `yarn start:dev`
✅ **Swagger accessible**: `http://localhost:3000/docs`
✅ **SuperAdmin seeded**: Check application logs

## Development Commands

```bash
# Complete setup
yarn setup

# Start development server
yarn start:dev

# View API documentation
yarn docs

# Database management
yarn prisma:studio
yarn prisma:push
yarn prisma:generate

# Testing
yarn test
yarn test:e2e
```

## Getting Help

If you encounter issues not covered here:

1. **Check application logs** for detailed error messages
2. **Verify environment variables** are correctly set
3. **Ensure database is accessible**
4. **Check network connectivity**
5. **Restart the application** after making changes

## Default Credentials

For development/testing (CHANGE IN PRODUCTION):

```
Email: superadmin@admin.com
Password: SuperAdmin@123
```

## Security Reminders

🔒 **Always change default credentials in production**
🔒 **Use strong JWT secrets**
🔒 **Keep environment variables secure**
🔒 **Enable proper database authentication**
