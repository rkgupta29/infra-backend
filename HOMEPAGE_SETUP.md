# Homepage Content Management - Quick Setup Guide

## Prerequisites

- NestJS backend running with Prisma and MongoDB
- Authentication system in place (JWT with ADMIN/SUPERADMIN roles)
- Database access and Prisma client generated

## Quick Setup Steps

### 1. Update Database Schema

The Prisma schema has been updated with the `HomepageSection` model. Apply the changes:

```bash
# Generate Prisma client with new schema
npx prisma generate

# Push schema changes to database
npx prisma db push
```

### 2. Module Integration

The `HomepageModule` has been added to `app.module.ts`. The system should now be available at:

- **Base URL**: `/content/home`
- **Swagger Docs**: Available at `/docs` under "Homepage Content Management"

### 3. Test the Implementation

#### Test Public Endpoints (No Auth Required)

```bash
# Get all homepage sections
curl http://localhost:3000/content/home

# Get hero section (will create default if doesn't exist)
curl http://localhost:3000/content/home/hero

# Get about section
curl http://localhost:3000/content/home/about
```

#### Test Admin Endpoints (Auth Required)

First, get a JWT token by logging in:

```bash
# Login to get JWT token
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "superadmin@admin.com",
    "password": "SuperAdmin@123"
  }'
```

Then use the token to test admin endpoints:

```bash
# Update hero section
curl -X PATCH http://localhost:3000/content/home/hero \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "Updated Hero Title",
      "subtitle": "Updated Subtitle",
      "description": "Updated description text",
      "backgroundImage": "/images/new-hero.jpg",
      "cta": [
        { "text": "Get Started", "target": "/signup", "variant": "primary" },
        { "text": "Learn More", "target": "/about", "variant": "secondary" }
      ]
    }
  }'
```

### 4. Run the Test Script

Use the provided test script to verify all functionality:

```bash
# Make sure your server is running
yarn start:dev

# In another terminal, run tests
node test-homepage-api.js
```

## Frontend Integration

### Basic React Component Example

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
    </div>
  );
}

export default Homepage;
```

## Common Use Cases

### 1. Creating a New Section

```bash
curl -X PATCH http://localhost:3000/content/home/partners \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "Our Partners",
      "description": "We collaborate with leading organizations",
      "partners": [
        { "name": "World Bank", "logo": "/images/wb.png" },
        { "name": "ADB", "logo": "/images/adb.png" }
      ]
    }
  }'
```

### 2. Updating Specific Fields

```bash
curl -X PATCH http://localhost:3000/content/home/hero/fields \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "title": "New Title Only",
      "subtitle": "New Subtitle Only"
    }
  }'
```

### 3. Toggling Section Visibility

```bash
curl -X PATCH http://localhost:3000/content/home/partners/toggle \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Troubleshooting

### Common Issues

1. **"Section not found" errors**: Sections are created automatically when first accessed
2. **Authentication errors**: Ensure JWT token is valid and user has ADMIN/SUPERADMIN role
3. **Validation errors**: Ensure request body follows the expected format

### Debug Mode

Enable debug logging in your NestJS app to see detailed request/response information:

```typescript
// In main.ts
app.enableCors();
app.use(express.json());
app.use(morgan('dev')); // Add request logging
```

## Next Steps

1. **Customize Default Templates**: Modify the default data in `HomepageService`
2. **Add Frontend Components**: Create React components for your specific content structures
3. **Implement Admin Interface**: Build an admin panel for content management
4. **Add Content Validation**: Implement custom validation for specific section types
5. **Content Versioning**: Add version control for content changes

## Support

- **API Documentation**: Available at `/docs` when server is running
- **Detailed Documentation**: See `HOMEPAGE_CONTENT_API.md`
- **Module Documentation**: See `src/homepage/README.md`
- **Test Script**: Use `test-homepage-api.js` to verify functionality
