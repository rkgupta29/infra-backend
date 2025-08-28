# Swagger API Documentation Guide

## Overview

This admin panel backend now includes comprehensive Swagger/OpenAPI documentation for all endpoints. The documentation provides interactive API exploration, request/response examples, and detailed endpoint descriptions.

## Accessing Swagger UI

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:4000/docs
```

## Features

### 🔧 **Interactive API Testing**
- Test all endpoints directly from the browser
- Automatic request/response validation
- JWT token authentication support
- Persistent authorization (tokens are saved in browser)

### 📚 **Comprehensive Documentation**
- Detailed endpoint descriptions
- Request/response schemas
- Example payloads
- Error response documentation
- Security requirements

### 🔐 **Authentication Integration**
- Bearer token authentication
- Automatic authorization headers
- Role-based access documentation

## API Sections

### 1. Authentication
- **POST /auth/login** - Admin login with email/password

### 2. Admin Management
- **POST /admin** - Create new admin (SUPERADMIN only)
- **GET /admin** - Get all admins (SUPERADMIN only)
- **GET /admin/profile** - Get current user profile
- **GET /admin/:id** - Get admin by ID
- **DELETE /admin/:id** - Delete admin with superadmin password confirmation (SUPERADMIN only)

## How to Use Swagger UI

### Step 1: Login
1. Navigate to the Authentication section
2. Click on **POST /auth/login**
3. Click "Try it out"
4. Enter your credentials:
   ```json
   {
     "email": "superadmin@admin.com",
     "password": "SuperAdmin@123"
   }
   ```
5. Click "Execute"
6. Copy the `access_token` from the response

### Step 2: Authorize
1. Click the "Authorize" button at the top of the page (the lock icon)
2. You'll see a dialog titled "Available authorizations"
3. In the input field under "Value", enter your token with the format: `Bearer your_token_here`
   - Example: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Make sure to include the word "Bearer" followed by a space before your token
4. Click "Authorize"
5. Click "Close"

### Step 3: Test Endpoints
Now you can test any endpoint. The JWT token will be automatically included in the Authorization header.

## Request/Response Examples

### Login Request
```json
{
  "email": "superadmin@admin.com",
  "password": "SuperAdmin@123"
}
```

### Login Response
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "email": "superadmin@admin.com",
    "name": "Super Administrator",
    "role": "SUPERADMIN"
  }
}
```

### Create Admin Request
```json
{
  "name": "John Doe",
  "email": "john@admin.com",
  "password": "SecurePassword123"
}
```

### Admin Response
```json
{
  "id": "507f1f77bcf86cd799439012",
  "name": "John Doe",
  "email": "john@admin.com",
  "role": "ADMIN",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### Delete Admin Request
```json
{
  "superAdminPassword": "SuperAdmin@123"
}
```

## Security Documentation

### Authentication
- All endpoints except `/auth/login` require JWT authentication
- JWT tokens are passed in the Authorization header as `Bearer <token>`
- Tokens expire based on the `JWT_EXPIRES_IN` environment variable (default: 24h)

### Authorization
- **SUPERADMIN** can perform all operations
- **ADMIN** can only view/update their own profile
- Role-based access control is enforced on all endpoints

### Validation
- All input data is validated using class-validator
- Email format validation
- Password minimum length (8 characters)
- Required field validation

### Error Responses
The API returns standard HTTP status codes with detailed error messages:

- **400 Bad Request** - Invalid input data
- **401 Unauthorized** - Invalid or missing JWT token
- **403 Forbidden** - Insufficient permissions
- **404 Not Found** - Resource not found
- **409 Conflict** - Resource already exists

## Environment Setup for Testing

Make sure your `.env` file contains:

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

## Starting the Application

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Generate Prisma client:**
   ```bash
   yarn prisma:generate
   ```

3. **Push schema to database:**
   ```bash
   yarn prisma:push
   ```

4. **Start the application:**
   ```bash
   yarn start:dev
   ```

5. **Access Swagger UI:**
   ```
   http://localhost:4000/docs
   ```

## Swagger Configuration Details

The Swagger configuration includes:

- **Title:** Admin Panel API
- **Description:** Secure admin panel backend with role-based access control
- **Version:** 1.0
- **Tags:** Authentication, Admin Management
- **Security:** JWT Bearer authentication
- **Persistence:** Authorization tokens are saved in browser

## Customization

You can customize the Swagger documentation by:

1. **Modifying the main configuration** in `src/main.ts`
2. **Adding new tags** for endpoint grouping
3. **Updating descriptions** in controller decorators
4. **Adding new response examples** in DTO files

## Troubleshooting

### Common Issues:

1. **Swagger UI not loading:**
   - Check if the application is running on the correct port
   - Verify no CORS issues in browser console

2. **Authentication not working:**
   - Ensure JWT token is correctly copied
   - Check token expiration
   - Verify the Authorization header format

3. **Endpoints not showing:**
   - Check controller decorators
   - Verify module imports
   - Restart the application

### Getting Help:

- Check the application logs for detailed error messages
- Use browser developer tools to inspect network requests
- Verify environment variables are correctly set
