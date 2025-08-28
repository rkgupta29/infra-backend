# Knowledge API Update: Pagination for Research Papers

The Research Papers API endpoints have been updated to include pagination functionality. This allows for better performance and user experience when dealing with large numbers of research papers.

## Updated Endpoints

### Get All Research Papers

```
GET /knowledge/research-papers
```

Query Parameters:
- `activeOnly` (boolean, optional): If true, returns only active research papers
- `sectorId` (string, optional): Filter research papers by sector ID
- `page` (number, optional, default: 1): Page number (starts from 1)
- `limit` (number, optional, default: 10): Number of items per page

Response:
```json
{
  "researchPapers": [
    {
      "id": "60d5ec9d8e8a8d2a5c8e8a8d",
      "image": "/assets/knowledge/researchPapers/01.jpg",
      "title": "Study on the implementation of compensatory afforestation in India",
      "description": "This paper examines the implementation of compensatory afforestation policies in India",
      "link": "/assets/pdf/Study-on-Implementation-of-Compensatory-Afforestation-in-India.pdf",
      "date": "2023-01-15T00:00:00.000Z",
      "active": true,
      "createdAt": "2023-01-15T10:00:00.000Z",
      "updatedAt": "2023-01-15T10:00:00.000Z",
      "sectorIds": ["60d5ec9d8e8a8d2a5c8e8a8e"],
      "sectors": [
        {
          "id": "60d5ec9d8e8a8d2a5c8e8a8e",
          "name": "Rural and Agri Infra",
          "slug": "rural-and-agri-infra",
          "description": "Rural and agricultural infrastructure sector",
          "active": true
        }
      ]
    }
  ],
  "pagination": {
    "totalCount": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  },
  "lastUpdated": "2023-06-15T10:00:00.000Z"
}
```

### Get Research Papers by Sector

```
GET /knowledge/research-papers/sector/:sectorId
```

Parameters:
- `sectorId` (string): The ID of the sector to filter by

Query Parameters:
- `activeOnly` (boolean, optional): If true, returns only active research papers
- `page` (number, optional, default: 1): Page number (starts from 1)
- `limit` (number, optional, default: 10): Number of items per page

The response format is the same as the "Get All Research Papers" endpoint.

## Implementation Details

- Pagination is implemented using the `skip` and `take` parameters in Prisma queries
- The response includes pagination metadata (totalCount, page, limit, totalPages)
- Default values are 10 items per page, starting from page 1
- The legacy endpoint for backward compatibility remains unchanged
