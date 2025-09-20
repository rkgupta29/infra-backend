# Engagements Module Migration Guide

The Engagements module has been updated to use a new data structure that better aligns with the frontend requirements. This document provides guidance on migrating from the old structure to the new one.

## Schema Changes

### Old Schema

```prisma
model Engagement {
  id          String     @id @default(auto()) @map("_id") @db.ObjectId
  title       String     // Title of the engagement/event
  description String     // Description of the engagement/event
  date        DateTime   // Date of the engagement/event
  location    String     // Location of the engagement/event
  tag         String     // Type tag (e.g., "Conference", "Workshop")
  subtitle    String?    // Optional subtitle or markdown content
  reportUrl   String?    // Optional URL to a report PDF
  covers      Json?      // Optional array of cover images with descriptions
  active      Boolean    @default(true)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  @@map("engagements")
}
```

### New Schema

```prisma
model Engagement {
  id          String     @id @default(auto()) @map("_id") @db.ObjectId
  date        String     // Date of the engagement in YYYY-MM-DD format
  meetingType String     // Type of meeting (e.g., "Webinar | Workshop | Event | Meeting")
  description String     // Short summary of the event
  ctaText     String?    // Call to action text for the main button
  details     Json       // Detailed information including images, content, and CTA
  active      Boolean    @default(true)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  @@map("engagements")
}
```

## Data Migration Steps

To migrate your existing data to the new schema, follow these steps:

1. Generate the updated Prisma client:

```bash
npx prisma generate
```

2. Push the schema changes to your database:

```bash
npx prisma db push
```

3. Run a migration script to transform your existing data:

```javascript
// Example migration script (can be run in a NestJS command)
async function migrateEngagements() {
  const oldEngagements = await prisma.engagement.findMany();
  
  for (const old of oldEngagements) {
    // Transform old data to new format
    await prisma.engagement.update({
      where: { id: old.id },
      data: {
        date: old.date.toISOString().split('T')[0], // Convert DateTime to YYYY-MM-DD string
        meetingType: old.tag || 'Event', // Use the old tag as meetingType
        description: old.description,
        ctaText: 'Register Now', // Default CTA text
        details: {
          images: old.covers || [{ 
            image: 'url-to-default-image.jpg', 
            description: 'Default image description' 
          }],
          content: old.subtitle || 'Full details about the event',
          cta: {
            ctaText: 'Join Now',
            link: old.reportUrl || 'https://example.com'
          }
        },
        active: old.active
      }
    });
  }
}
```

## Example of New Data Format

```json
{
  "date": "2025-09-19",
  "meetingType": "Webinar | Workshop | Event | Meeting",
  "description": "Short summary of the event",
  "ctaText": "Register Now",
  "details": {
    "images": [
      {
        "image": "url-to-image.jpg",
        "description": "Image description or alt text"
      }
    ],
    "content": "Full details about the event (long description, agenda, etc.)",
    "cta": {
      "ctaText": "Join Now",
      "link": "https://example.com"
    }
  }
}
```

## API Changes

The API endpoints remain the same, but the request and response payloads have changed to match the new data structure.

### Creating a New Engagement

```bash
curl -X POST http://localhost:4000/outreach-and-engagements \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -d '{
    "date": "2025-09-19",
    "meetingType": "Webinar | Workshop | Event | Meeting",
    "description": "Short summary of the event",
    "ctaText": "Register Now",
    "details": {
      "images": [
        {
          "image": "url-to-image.jpg",
          "description": "Image description or alt text"
        }
      ],
      "content": "Full details about the event (long description, agenda, etc.)",
      "cta": {
        "ctaText": "Join Now",
        "link": "https://example.com"
      }
    }
  }'
```

## Important Notes

1. The date field is now a string in YYYY-MM-DD format instead of a DateTime object
2. The details field is a structured JSON object with specific properties
3. Filtering by year and month now uses string operations instead of DateTime comparisons
4. The primary event endpoint still works but uses string date comparisons

## Rollback Plan

If you need to roll back these changes:

1. Restore the previous schema from version control
2. Run `npx prisma generate` and `npx prisma db push` to revert the schema changes
3. Run a reverse migration script to restore the old data format
