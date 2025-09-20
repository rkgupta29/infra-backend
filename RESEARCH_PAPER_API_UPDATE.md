# Research Paper API Update

The Research Paper API has been updated to support multipart/form-data for both POST and PATCH endpoints.

## Changes Made

1. **PATCH Endpoint Updated**:
   - Now supports multipart/form-data with file uploads
   - Can update text fields and files in a single request
   - Files are optional - only uploaded files will be processed

## Using the PATCH Endpoint

### Endpoint

```
PATCH /knowledge/research-papers/:id
```

### Authentication

- Requires a valid JWT token with ADMIN or SUPERADMIN role
- Token must be provided in the Authorization header as a Bearer token

### Request Format

The request must use `multipart/form-data` format to allow file uploads.

### Fields (All Optional)

- `title` (string): The title of the research paper
- `description` (string): The description of the research paper
- `date` (string): The publication date in YYYY-MM-DD format
- `active` (boolean): Whether the research paper is active
- `sectorIds` (string or array): Comma-separated list or array of sector IDs
- `imageFile` (file): New cover image for the research paper
- `pdfFile` (file): New PDF file for the research paper

### Example cURL Request

```bash
curl -X PATCH \
  'http://localhost:4000/knowledge/research-papers/60d21b4667d0d8992e610c85' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -H 'Content-Type: multipart/form-data' \
  -F 'title=Updated Research Paper Title' \
  -F 'description=Updated description of the research paper' \
  -F 'date=2023-09-15' \
  -F 'active=true' \
  -F 'sectorIds=60d21b4667d0d8992e610c86,60d21b4667d0d8992e610c87' \
  -F 'imageFile=@new-cover-image.jpg' \
  -F 'pdfFile=@new-document.pdf'
```

### Partial Updates

You can update only specific fields by including only those fields in your request:

```bash
# Update only the title and description
curl -X PATCH \
  'http://localhost:4000/knowledge/research-papers/60d21b4667d0d8992e610c85' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -H 'Content-Type: multipart/form-data' \
  -F 'title=Updated Research Paper Title' \
  -F 'description=Updated description of the research paper'

# Update only the image file
curl -X PATCH \
  'http://localhost:4000/knowledge/research-papers/60d21b4667d0d8992e610c85' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -H 'Content-Type: multipart/form-data' \
  -F 'imageFile=@new-cover-image.jpg'
```

### Response

- Status Code: 200 (OK)
- Body: The updated research paper object

## Notes

- Files are only processed if included in the request
- Existing files are preserved if no new files are uploaded
- The system generates unique filenames for uploaded files
- All fields are optional - only provided fields will be updated
