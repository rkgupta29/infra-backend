# Gallery API Documentation

This document provides detailed information about the Gallery API endpoints and how to use them.

## POST /archives/gallery

Creates a new gallery item with an image upload.

### Authentication

- Requires a valid JWT token with ADMIN or SUPERADMIN role
- Token must be provided in the Authorization header as a Bearer token

### Request Format

The request must use `multipart/form-data` format to allow file uploads.

### Required Fields

- `event` (string): Name of the event
- `year` (integer): Year of the event (must be ≥ 1900)
- `description` (string): Description of the image
- `tabId` (string): ID of the archive tab this gallery item belongs to
- `file` (image file): Image file to upload (JPEG, PNG, GIF, or WebP)

### Optional Fields

- `active` (boolean): Whether the gallery item is active (default: true)
  - Must be provided as string "true" or "false" in form data

### Example cURL Request

```bash
curl -X 'POST' \
  'http://localhost:4000/archives/gallery' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -H 'Content-Type: multipart/form-data' \
  -F 'event=Annual Conference 2023' \
  -F 'year=2023' \
  -F 'description=Keynote speech by the CEO at the annual conference' \
  -F 'tabId=60d21b4667d0d8992e610c85' \
  -F 'active=true' \
  -F 'file=@your-image-file.jpg;type=image/jpeg'
```

### Response

- Status Code: 201 (Created)
- Body: The created gallery item object

### Common Errors

- 400 Bad Request: Invalid input data
  - Common validation errors:
    - "Year must not be less than 1900"
    - "Year must be an integer number"
    - "Active must be a boolean value"
    - "Image file is required"
    - "Tab ID not found"
- 401 Unauthorized: Missing or invalid JWT token
- 403 Forbidden: Insufficient permissions (not ADMIN or SUPERADMIN)

### Notes

- The `image` field will be automatically populated with the URL of the uploaded image
- The image file will be stored in the assets/images directory
- Maximum file size: 10MB
- Supported image formats: JPEG, PNG, GIF, WebP

## GET /archives/gallery

Retrieves all gallery items with pagination and filtering.

### Query Parameters

- `page` (number, optional): Page number for pagination (default: 1)
- `limit` (number, optional): Number of items per page (default: 10)
- `year` (number, optional): Filter by year
- `event` (string, optional): Filter by event name (case-insensitive partial match)
- `tabId` (string, optional): Filter by tab ID
- `tabSlug` (string, optional): Filter by tab slug
- `sortBy` (string, optional): Field to sort by (default: "year")
- `sortOrder` (string, optional): Sort order, "asc" or "desc" (default: "desc")

### Example Response

```json
{
  "data": [
    {
      "id": "60d21b4667d0d8992e610c85",
      "image": "/assets/images/gallery/event-2023-01.jpg",
      "event": "Annual Conference 2023",
      "year": 2023,
      "description": "Keynote speech by the CEO at the annual conference",
      "tabId": "60d21b4667d0d8992e610c86",
      "active": true,
      "createdAt": "2023-06-10T12:00:00.000Z",
      "updatedAt": "2023-06-10T12:00:00.000Z",
      "tab": {
        "id": "60d21b4667d0d8992e610c86",
        "name": "Events",
        "slug": "events",
        "description": "All event photos",
        "order": 1,
        "active": true,
        "createdAt": "2023-06-10T12:00:00.000Z",
        "updatedAt": "2023-06-10T12:00:00.000Z"
      }
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10,
    "hasNext": true,
    "hasPrevious": false
  },
  "lastUpdated": "2023-06-10T12:00:00.000Z"
}
```
