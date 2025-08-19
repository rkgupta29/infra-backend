# Homepage Content Management API

## Overview

The Homepage Content Management API provides a flexible system for managing dynamic content on your website's homepage. Each section can have completely custom data structures, allowing admins to create rich, varied content without code changes.

## Base URL

```
http://localhost:3000/content/home
```

## Authentication

- **Read operations** (GET): Public endpoints, no authentication required
- **Write operations** (PATCH, DELETE): Require JWT authentication with ADMIN or SUPERADMIN role

### Authentication Header
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### 1. Get All Homepage Sections

**GET** `/content/home`

Retrieves all active homepage sections. This endpoint is public and returns all sections in a single response.

**Response Example:**
```json
{
  "hero": {
    "title": "Independent think tank",
    "subtitle": "seeking to impact India's infrastructure landscape",
    "description": "Helping shape public discourse and policy interventions through action research and advocacy.",
    "backgroundImage": "/images/hero-bg.jpg",
    "cta": [
      { "text": "Learn More", "target": "/about", "variant": "primary" },
      { "text": "Contact Us", "target": "/contact", "variant": "secondary" }
    ]
  },
  "about": {
    "title": "About Us",
    "description": "We are dedicated to improving infrastructure policy in India.",
    "image": "/images/about.jpg",
    "subtitles": ["Research Excellence", "Policy Impact", "Collaborative Approach"],
    "paragraphs": [
      { "title": "Our Mission", "content": "To transform infrastructure policy through research." },
      { "title": "Our Vision", "content": "A future with sustainable and inclusive infrastructure." }
    ]
  },
  "features": {
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
}
```

### 2. Get Specific Section

**GET** `/content/home/{section-key}`

Retrieves a specific homepage section by its key. If the section doesn't exist, it will be created with default values.

**Parameters:**
- `section-key` (string): The unique identifier for the section (e.g., hero, about, features)

**Response Example:**
```json
{
  "title": "Independent think tank",
  "subtitle": "seeking to impact India's infrastructure landscape",
  "description": "Helping shape public discourse and policy interventions through action research and advocacy.",
  "backgroundImage": "/images/hero-bg.jpg",
  "cta": [
    { "text": "Learn More", "target": "/about", "variant": "primary" },
    { "text": "Contact Us", "target": "/contact", "variant": "secondary" }
  ]
}
```

### 3. Update Section Completely

**PATCH** `/content/home/{section-key}`

Updates a homepage section with completely new data. This replaces all existing data in the section.

**Parameters:**
- `section-key` (string): The unique identifier for the section to update

**Request Body:**
```json
{
  "data": {
    "title": "New Hero Title",
    "subtitle": "New Subtitle Text",
    "description": "Updated description with new content",
    "backgroundImage": "/images/new-hero.jpg",
    "cta": [
      { "text": "Get Started", "target": "/signup", "variant": "primary" },
      { "text": "Watch Video", "target": "/video", "variant": "secondary" },
      { "text": "Read More", "target": "/blog", "variant": "tertiary" }
    ],
    "additionalInfo": "This is a new field that wasn't in the original data"
  }
}
```

**Response:** Returns the updated section object

### 4. Update Section Fields

**PATCH** `/content/home/{section-key}/fields`

Updates only the specified fields in a homepage section, preserving other existing data.

**Parameters:**
- `section-key` (string): The unique identifier for the section to update

**Request Body:**
```json
{
  "fields": {
    "title": "Updated Title Only",
    "subtitle": "Updated Subtitle Only"
  }
}
```

**Response:** Returns the updated section object

### 5. Toggle Section Status

**PATCH** `/content/home/{section-key}/toggle`

Toggles the active status of a homepage section. Inactive sections won't be returned by the "Get All Sections" endpoint.

**Parameters:**
- `section-key` (string): The unique identifier for the section to toggle

**Response:** Returns the updated section object with the new active status

### 6. Delete Section

**DELETE** `/content/home/{section-key}`

Permanently deletes a homepage section. This action cannot be undone.

**Parameters:**
- `section-key` (string): The unique identifier for the section to delete

**Response:** Returns the deleted section object

## Section Types and Default Data

The system provides sensible defaults for common section types:

### Hero Section (`hero`)
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

### About Section (`about`)
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

### Features Section (`features`)
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

### Testimonials Section (`testimonials`)
```json
{
  "title": "What People Say",
  "items": [
    { 
      "quote": "Their research has been instrumental in our policy decisions.",
      "author": "Jane Doe",
      "position": "Policy Director",
      "organization": "Ministry of Infrastructure"
    }
  ]
}
```

## Usage Examples

### Example 1: Creating a Custom Section

```bash
# Create a new "partners" section
curl -X PATCH http://localhost:3000/content/home/partners \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "Our Partners",
      "description": "We collaborate with leading organizations worldwide",
      "partners": [
        {
          "name": "World Bank",
          "logo": "/images/partners/world-bank.png",
          "description": "Global development partner"
        },
        {
          "name": "Asian Development Bank",
          "logo": "/images/partners/adb.png",
          "description": "Regional development partner"
        }
      ]
    }
  }'
```

### Example 2: Updating Specific Fields

```bash
# Update only the title and description of the hero section
curl -X PATCH http://localhost:3000/content/home/hero/fields \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "title": "Updated Hero Title",
      "description": "New description text for the hero section"
    }
  }'
```

### Example 3: Adding More CTAs to Hero

```bash
# Add more call-to-action buttons to the hero section
curl -X PATCH http://localhost:3000/content/home/hero/fields \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "cta": [
        { "text": "Learn More", "target": "/about", "variant": "primary" },
        { "text": "Contact Us", "target": "/contact", "variant": "secondary" },
        { "text": "Join Our Team", "target": "/careers", "variant": "primary" },
        { "text": "Download Report", "target": "/reports", "variant": "secondary" }
      ]
    }
  }'
```

### Example 4: Creating a Complex Section

```bash
# Create a complex "research" section with multiple subsections
curl -X PATCH http://localhost:3000/content/home/research \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "Research & Publications",
      "description": "Our latest research and policy insights",
      "categories": [
        {
          "name": "Infrastructure Policy",
          "count": 15,
          "recent": [
            { "title": "Urban Transport Policy", "date": "2024-01-15", "url": "/research/urban-transport" },
            { "title": "Digital Infrastructure", "date": "2024-01-10", "url": "/research/digital-infra" }
          ]
        },
        {
          "name": "Economic Analysis",
          "count": 8,
          "recent": [
            { "title": "Investment Trends", "date": "2024-01-12", "url": "/research/investment-trends" }
          ]
        }
      ],
      "stats": {
        "totalPublications": 23,
        "downloads": 15420,
        "citations": 89
      }
    }
  }'
```

## Error Handling

### Common Error Responses

**400 Bad Request**
```json
{
  "statusCode": 400,
  "message": "Data must be a valid object",
  "error": "Bad Request"
}
```

**401 Unauthorized**
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

**403 Forbidden**
```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

**404 Not Found**
```json
{
  "statusCode": 404,
  "message": "Section with key 'nonexistent' not found",
  "error": "Not Found"
}
```

## Best Practices

1. **Use Descriptive Section Keys**: Choose meaningful keys like `hero`, `about`, `features`, `testimonials`, etc.

2. **Plan Your Data Structure**: Before creating sections, plan the data structure to ensure consistency across your frontend.

3. **Use the Fields Endpoint**: For minor updates, use `/fields` to avoid overwriting other data.

4. **Test with Default Data**: Always test your frontend with the default data structure first.

5. **Backup Important Changes**: Before major updates, note down the current structure.

6. **Use Meaningful Field Names**: Choose field names that are self-explanatory for your content editors.

## Frontend Integration

### React Example

```typescript
import { useEffect, useState } from 'react';

interface HomepageContent {
  [key: string]: any;
}

function Homepage() {
  const [content, setContent] = useState<HomepageContent>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/content/home')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Hero Section */}
      {content.hero && (
        <section className="hero">
          <h1>{content.hero.title}</h1>
          <h2>{content.hero.subtitle}</h2>
          <p>{content.hero.description}</p>
          {content.hero.cta?.map((button: any, index: number) => (
            <a key={index} href={button.target} className={`btn btn-${button.variant}`}>
              {button.text}
            </a>
          ))}
        </section>
      )}

      {/* About Section */}
      {content.about && (
        <section className="about">
          <h2>{content.about.title}</h2>
          <p>{content.about.description}</p>
          {content.about.subtitles?.map((subtitle: string, index: number) => (
            <h3 key={index}>{subtitle}</h3>
          ))}
        </section>
      )}

      {/* Features Section */}
      {content.features && (
        <section className="features">
          <h2>{content.features.title}</h2>
          <p>{content.features.description}</p>
          <div className="features-grid">
            {content.features.items?.map((item: any, index: number) => (
              <div key={index} className="feature-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.cta && (
                  <a href={item.cta.target} className="btn">
                    {item.cta.text}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Homepage;
```

## Database Schema

The system uses a simple MongoDB collection structure:

```javascript
{
  _id: ObjectId,
  sectionKey: String,        // Unique identifier for the section
  data: Object,              // Flexible JSON data for the section
  active: Boolean,           // Whether the section is active
  createdAt: Date,           // Creation timestamp
  updatedAt: Date            // Last update timestamp
}
```

## Security Considerations

1. **Input Validation**: All input is validated to ensure it's a valid JSON object
2. **Authentication Required**: All write operations require valid JWT tokens
3. **Role-Based Access**: Only ADMIN and SUPERADMIN users can modify content
4. **SQL Injection Protection**: Uses Prisma ORM with parameterized queries
5. **XSS Protection**: Input is stored as-is; frontend should implement proper escaping

## Rate Limiting

Consider implementing rate limiting for the write endpoints to prevent abuse:

- **Update endpoints**: 10 requests per minute per user
- **Delete endpoints**: 5 requests per minute per user
- **Read endpoints**: No rate limiting (public access)

## Monitoring and Logging

The system logs all content modifications for audit purposes:

- Content creation timestamps
- Content update timestamps
- User who made the changes
- Section keys being modified
- Data size and structure changes
