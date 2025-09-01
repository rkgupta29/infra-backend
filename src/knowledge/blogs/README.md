# Blogs Module

This module manages blog content within the Knowledge section of the application.

## Features

- Create, read, update, and delete blog posts
- Associate blogs with multiple sectors
- Filter blogs by sector
- Upload and manage PDF documents associated with blogs
- Upload and manage cover images for blogs
- Toggle active status of blogs
- Pagination support for listing blogs

## Data Model

The Blog model includes the following fields:

- `id`: Unique identifier (MongoDB ObjectId)
- `title`: Main title of the blog
- `subtitle`: Optional subtitle or tagline
- `authorName`: Name of the author
- `authorDesignation`: Job title or designation of the author
- `publishedDate`: Date when the blog was published
- `docFile`: URL to the associated PDF document
- `coverImage`: URL to the blog's cover image
- `content`: Markdown content of the blog
- `active`: Boolean flag indicating if the blog is active
- `sectors`: Related sectors that the blog belongs to
- `sectorIds`: Array of sector IDs that the blog is associated with
- `createdAt`: Timestamp when the blog was created
- `updatedAt`: Timestamp when the blog was last updated

## API Endpoints

### Public Endpoints

- `GET /knowledge/blogs`: Get all blogs (with optional pagination, active-only filtering, and sector filtering)
- `GET /knowledge/blogs/:id`: Get a specific blog by ID
- `GET /knowledge/blogs/by-sector/:sectorId`: Get blogs filtered by sector ID

### Admin-only Endpoints

- `POST /knowledge/blogs`: Create a new blog (with file uploads)
- `PATCH /knowledge/blogs/:id`: Update a blog's information
- `PATCH /knowledge/blogs/:id/files`: Update a blog's files (cover image and/or document)
- `PATCH /knowledge/blogs/:id/toggle-status`: Toggle a blog's active status
- `DELETE /knowledge/blogs/:id`: Delete a blog

## File Uploads

This module supports uploading two types of files:

1. **Cover Image**: An image file (JPEG, PNG, GIF, or WebP) that serves as the visual representation of the blog.
2. **Document File**: A PDF file containing the detailed content or supplementary material for the blog.

Files are stored in the `assets/images` and `assets/pdf` directories respectively, with unique filenames generated using a combination of the blog title, timestamp, and random hash.

## Authentication and Authorization

All write operations (create, update, delete) require authentication with admin privileges. Read operations are publicly accessible.

## Usage Examples

### Creating a Blog

To create a new blog, send a `multipart/form-data` POST request to `/knowledge/blogs` with the following fields:

- `coverImageFile`: Cover image file (required)
- `docFile`: PDF document file (required)
- `title`: Blog title (required)
- `subtitle`: Blog subtitle (optional)
- `authorName`: Author name (required)
- `authorDesignation`: Author designation (required)
- `publishedDate`: Publication date in YYYY-MM-DD format (required)
- `content`: Markdown content (required)
- `sectorIds`: Array of sector IDs or comma-separated string of sector IDs (required)
- `active`: Whether the blog is active (optional, defaults to true)

### Updating Blog Files

To update a blog's files, send a `multipart/form-data` PATCH request to `/knowledge/blogs/:id/files` with the following fields:

- `coverImageFile`: New cover image file (optional)
- `docFile`: New PDF document file (optional)

You can include either one or both files in the request. Only the provided files will be updated.
