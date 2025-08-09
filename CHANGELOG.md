# Changelog

## [Version 1.1.0] - Latest Changes

### 🔧 **API Changes**

#### **Delete Admin Endpoint**
- **Changed**: Delete confirmation from text-based to password-based
- **Old**: Required exact text `DELETE {admin_email}`
- **New**: Requires superadmin password verification
- **Security**: More secure as it verifies the actual superadmin identity

#### **Admin Profile Updates**
- **Removed**: All admin profile update endpoints
- **Removed**: `PATCH /admin/:id` endpoint
- **Removed**: Profile update functionality
- **Reason**: Simplified admin management - admins cannot modify profiles

#### **Documentation Route**
- **Changed**: Swagger documentation route
- **Old**: `http://localhost:3000/api`
- **New**: `http://localhost:3000/docs`

### 📚 **Updated API Endpoints**

#### **Authentication**
- `POST /auth/login` - Admin login ✅

#### **Admin Management**
- `POST /admin` - Create new admin (SUPERADMIN only) ✅
- `GET /admin` - Get all admins (SUPERADMIN only) ✅
- `GET /admin/profile` - Get current user profile ✅
- `GET /admin/:id` - Get admin by ID ✅
- `DELETE /admin/:id` - Delete admin with password confirmation (SUPERADMIN only) ✅

### 🛡️ **Security Enhancements**

#### **Delete Admin Security**
```json
// New delete request format
{
  "superAdminPassword": "SuperAdmin@123"
}
```

**Security Benefits**:
- ✅ Verifies superadmin identity through password
- ✅ Prevents unauthorized deletions
- ✅ More secure than text confirmation
- ✅ Uses bcrypt password comparison

### 🚫 **Removed Features**

#### **Admin Profile Updates**
- No longer possible to update admin profiles via API
- Removed `UpdateAdminDto`
- Removed update service methods
- Simplified admin management

**Rationale**:
- Reduces attack surface
- Simplifies admin management
- Prevents unauthorized profile modifications

### 📖 **Documentation Updates**

#### **Swagger Documentation**
- **New Route**: `http://localhost:3000/docs`
- **Updated Examples**: All examples reflect new password-based deletion
- **Removed Endpoints**: Update endpoints no longer documented
- **Enhanced Security**: Clear documentation of password requirements

#### **API Documentation**
- Updated all endpoint examples
- Removed update endpoint documentation
- Enhanced security feature descriptions
- Updated user role descriptions

#### **Setup Guide**
- Updated Swagger URL references
- Enhanced troubleshooting guide
- Added password-based deletion examples

### 🔍 **User Roles Updated**

#### **SUPERADMIN Permissions**
- ✅ Create new admins
- ✅ View all admins
- ✅ Delete any admin (with password confirmation)
- ✅ View any admin profile
- ❌ Update admin profiles (removed)

#### **ADMIN Permissions**
- ✅ View own profile
- ❌ Create, update, delete, or view other admins

### ⚡ **Technical Changes**

#### **DTO Updates**
- `DeleteConfirmationDto` now uses `superAdminPassword` field
- Removed `UpdateAdminDto` completely
- Enhanced validation with password length requirements

#### **Service Layer**
- Updated `AdminService.remove()` method with password verification
- Removed `AdminService.update()` method
- Added bcrypt password comparison for delete operations

#### **Controller Layer**
- Removed `PATCH /admin/:id` endpoint
- Updated Swagger documentation for delete endpoint
- Simplified controller with fewer endpoints

#### **Import Cleanup**
- Removed unused `UpdateAdminDto` imports
- Cleaned up controller and service dependencies

### 🚀 **Migration Guide**

#### **For API Consumers**

**Delete Admin (Updated)**:
```bash
# Old way (no longer works)
curl -X DELETE http://localhost:3000/admin/{id} \
  -H "Authorization: Bearer {token}" \
  -d '{"confirmationText": "DELETE admin@email.com"}'

# New way
curl -X DELETE http://localhost:3000/admin/{id} \
  -H "Authorization: Bearer {token}" \
  -d '{"superAdminPassword": "SuperAdmin@123"}'
```

**Update Admin (Removed)**:
```bash
# This endpoint no longer exists
# PATCH /admin/:id - REMOVED
```

**Documentation Access**:
```bash
# Old URL (no longer works)
http://localhost:3000/api

# New URL
http://localhost:3000/docs
```

### ✅ **Testing Checklist**

- ✅ Build successful
- ✅ No linting errors
- ✅ All remaining endpoints functional
- ✅ Swagger documentation updated
- ✅ Password-based deletion working
- ✅ Documentation routes updated

### 🔄 **Backwards Compatibility**

**Breaking Changes**:
- Delete admin endpoint request format changed
- Update admin endpoints completely removed
- Swagger documentation URL changed

**Migration Required**:
- Update any API clients using delete admin functionality
- Remove any code calling update admin endpoints
- Update documentation URL bookmarks
