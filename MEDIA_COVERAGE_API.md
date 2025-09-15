# Media Coverage API Documentation

This document provides detailed information about the Media Coverage API endpoints and how to use them.

## POST /archives/media-coverage

Creates a new media coverage entry with an image upload.

### Authentication

- Requires a valid JWT token with ADMIN or SUPERADMIN role
- Token must be provided in the Authorization header as a Bearer token

### Request Format

The request must use `multipart/form-data` format to allow file uploads.

### Required Fields

- `title` (string): Title of the media coverage
- `authorName` (string): Name of the author or publication
- `date` (string): Date of publication (e.g., "July 15, 2023")
- `publicationYear` (integer): Year of publication (must be ≥ 1900)
- `file` (image file): Cover image file to upload (JPEG, PNG, GIF, or WebP)

### Optional Fields

- `subtitle` (string): Subtitle of the media coverage
- `active` (boolean): Whether the media coverage is active (default: true)
  - Must be provided as string "true" or "false" in form data

### Example cURL Request

```bash
curl -X 'POST' \
  'http://localhost:4000/archives/media-coverage' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -H 'Content-Type: multipart/form-data' \
  -F 'title=Infrastructure Development in Rural Areas' \
  -F 'subtitle=A comprehensive analysis of recent initiatives' \
  -F 'authorName=The Economic Times' \
  -F 'date=July 15, 2023' \
  -F 'publicationYear=2023' \
  -F 'active=true' \
  -F 'file=@your-image-file.jpg;type=image/jpeg'
```

### Response

- Status Code: 201 (Created)
- Body: The created media coverage object

### Common Errors

- 400 Bad Request: Invalid input data
  - Common validation errors:
    - "publicationYear must not be less than 1900"
    - "publicationYear must be an integer number"
    - "active must be a boolean value"

### Important Notes About Form Data

- When submitting form data, the `publicationYear` field must be a valid integer greater than or equal to 1900
- The `active` field must be a string "true" or "false" (case-insensitive)
- The system will automatically convert these values to the appropriate types before validation
- 401 Unauthorized: Missing or invalid JWT token
- 403 Forbidden: Insufficient permissions (not ADMIN or SUPERADMIN)

### Notes

- The `coverImage` field will be automatically populated with the URL of the uploaded image
- The image file will be stored in the assets/images directory
- Maximum file size: 10MB
- Supported image formats: JPEG, PNG, GIF, WebP
