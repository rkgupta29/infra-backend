# Homepage Content Management Module

## Overview

The Homepage Content Management Module provides a flexible system for managing dynamic content on your website's homepage. It allows administrators to create, update, and manage various sections of the homepage without requiring code changes.

## Features

- **Flexible Data Structure**: Each section can have completely custom data structures
- **Public Read Access**: Frontend can fetch content without authentication
- **Admin-Only Write Access**: Only authenticated admins can modify content
- **Default Templates**: Sensible defaults for common section types
- **Partial Updates**: Update specific fields without overwriting entire sections
- **Section Management**: Toggle sections on/off, delete sections

## Architecture

### Database Schema

```prisma
model HomepageSection {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  sectionKey  String   @unique  // e.g., "hero", "about", "features"
  data        Json     // Completely flexible JSON structure
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("homepage_sections")
}
```

### Service Layer

The `HomepageService` provides:

- **Content Retrieval**: Get all sections or specific sections
- **Content Management**: Create, update, and delete sections
- **Default Data**: Automatic creation of sections with sensible defaults
- **Validation**: Input validation and error handling

### Controller Layer

The `HomepageController` exposes REST endpoints:

- **Public Endpoints**: Read operations for frontend consumption
- **Protected Endpoints**: Write operations requiring admin authentication
- **Swagger Documentation**: Comprehensive API documentation

## Usage

### 1. Get All Homepage Content

```typescript
// Frontend can fetch all content in one request
const response = await fetch('/content/home');
const homepageContent = await response.json();

// homepageContent will contain all active sections
// {
//   hero: { title: "...", subtitle: "...", ... },
//   about: { title: "...", description: "...", ... },
//   features: { title: "...", items: [...] }
// }
```

### 2. Get Specific Section

```typescript
// Get just the hero section
const response = await fetch('/content/home/hero');
const heroSection = await response.json();
```

### 3. Update Section (Admin Only)

```typescript
// Update the hero section completely
const response = await fetch('/content/home/hero', {
  method: 'PATCH',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    data: {
      title: 'New Hero Title',
      subtitle: 'New Subtitle',
      description: 'Updated description',
      cta: [
        { text: 'Learn More', target: '/about', variant: 'primary' },
        { text: 'Contact Us', target: '/contact', variant: 'secondary' }
      ]
    }
  })
});
```

### 4. Update Specific Fields (Admin Only)

```typescript
// Update only the title and subtitle
const response = await fetch('/content/home/hero/fields', {
  method: 'PATCH',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fields: {
      title: 'Updated Title Only',
      subtitle: 'Updated Subtitle Only'
    }
  })
});
```

## Default Section Templates

### Hero Section
```json
{
  "title": "Independent think tank",
  "subtitle": "seeking to impact India's infrastructure landscape",
  "description": "Helping shape public discourse and policy interventions through action research and advocacy.",
  "backgroundImage": "/images/default-hero.jpg",
  "cta": [
    { "text": "Learn More", "target": "/about", "variant": "primary" },
    { "text": "Contact Us", "target": "/contact", "variant": "secondary" }
  ]
}
```

### About Section
```json
{
  "title": "About Us",
  "description": "We are dedicated to improving infrastructure policy in India.",
  "image": "/images/default-about.jpg",
  "subtitles": ["Research Excellence", "Policy Impact", "Collaborative Approach"],
  "paragraphs": [
    { "title": "Our Mission", "content": "To transform infrastructure policy through research." },
    { "title": "Our Vision", "content": "A future with sustainable and inclusive infrastructure." }
  ]
}
```

### Features Section
```json
{
  "title": "Our Services",
  "description": "We offer a range of services to support infrastructure development.",
  "items": [
    { 
      "title": "Research",
      "description": "In-depth analysis of infrastructure policies",
      "icon": "research",
      "cta": { "text": "Learn More", "target": "/research" }
    },
    { 
      "title": "Advocacy",
      "description": "Engaging with policymakers",
      "icon": "advocacy",
      "cta": { "text": "Our Approach", "target": "/advocacy" }
    }
  ]
}
```

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/content/home` | Get all homepage sections | No |
| GET | `/content/home/:key` | Get specific section | No |
| PATCH | `/content/home/:key` | Update section completely | Yes |
| PATCH | `/content/home/:key/fields` | Update specific fields | Yes |
| PATCH | `/content/home/:key/toggle` | Toggle section status | Yes |
| DELETE | `/content/home/:key` | Delete section | Yes |

## Security

- **Read Operations**: Public access, no authentication required
- **Write Operations**: Require JWT authentication with ADMIN or SUPERADMIN role
- **Input Validation**: All inputs are validated to ensure they are valid JSON objects
- **Role-Based Access**: Uses existing authentication and authorization system

## Error Handling

The service includes comprehensive error handling:

- **Validation Errors**: Invalid input data
- **Authentication Errors**: Missing or invalid JWT tokens
- **Authorization Errors**: Insufficient permissions
- **Not Found Errors**: Attempting to access non-existent sections

## Testing

Use the provided test script to verify functionality:

```bash
# Make sure your server is running
yarn start:dev

# In another terminal, run the test script
node test-homepage-api.js
```

## Frontend Integration

The flexible JSON structure allows frontend components to render any content structure. Frontend should:

1. **Handle Missing Fields**: Gracefully handle sections or fields that don't exist
2. **Type Safety**: Use TypeScript interfaces for expected data structures
3. **Fallback Values**: Provide sensible defaults for missing content
4. **Dynamic Rendering**: Create components that can render various data structures

## Best Practices

1. **Plan Data Structures**: Design consistent data structures across sections
2. **Use Descriptive Keys**: Choose meaningful section keys
3. **Version Control**: Consider versioning for major content structure changes
4. **Backup Content**: Export important content before major updates
5. **Test Frontend**: Always test frontend rendering with new content structures

## Future Enhancements

- **Content Versioning**: Track changes and allow rollbacks
- **Content Templates**: Predefined templates for common section types
- **Media Management**: Integrated image and file management
- **Content Scheduling**: Schedule content changes for future dates
- **Multi-language Support**: Support for multiple languages
- **Content Analytics**: Track content performance and engagement
