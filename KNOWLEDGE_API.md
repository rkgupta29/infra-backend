# Knowledge API Documentation

This document provides information about the Knowledge API endpoints, which include Research Papers and Sectors.

## Research Papers

Research papers are academic or professional papers related to various sectors. Each research paper can be associated with multiple sectors.

### Endpoints

#### Get All Research Papers

```
GET /knowledge/research-papers
```

Query Parameters:
- `activeOnly` (boolean, optional): If true, returns only active research papers
- `sectorId` (string, optional): Filter research papers by sector ID

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
  "totalCount": 1,
  "lastUpdated": "2023-06-15T10:00:00.000Z"
}
```

#### Get Legacy Research Papers

```
GET /knowledge/research-papers/legacy
```

Returns the static research papers data for backward compatibility.

#### Get Research Paper by ID

```
GET /knowledge/research-papers/:id
```

Parameters:
- `id` (string): The ID of the research paper to retrieve

#### Get Research Papers by Sector

```
GET /knowledge/research-papers/sector/:sectorId
```

Parameters:
- `sectorId` (string): The ID of the sector to filter by

Query Parameters:
- `activeOnly` (boolean, optional): If true, returns only active research papers

#### Create Research Paper (Admin only)

```
POST /knowledge/research-papers
```

Request Body:
```json
{
  "image": "/assets/knowledge/researchPapers/01.jpg",
  "title": "Study on the implementation of compensatory afforestation in India",
  "description": "This paper examines the implementation of compensatory afforestation policies in India",
  "link": "/assets/pdf/Study-on-Implementation-of-Compensatory-Afforestation-in-India.pdf",
  "date": "2023-01-15",
  "active": true,
  "sectorIds": ["60d5ec9d8e8a8d2a5c8e8a8e"]
}
```

#### Update Research Paper (Admin only)

```
PATCH /knowledge/research-papers/:id
```

Parameters:
- `id` (string): The ID of the research paper to update

Request Body:
```json
{
  "title": "Updated title",
  "description": "Updated description"
}
```

#### Toggle Research Paper Status (Admin only)

```
PATCH /knowledge/research-papers/:id/toggle-status
```

Parameters:
- `id` (string): The ID of the research paper to toggle status

#### Delete Research Paper (Admin only)

```
DELETE /knowledge/research-papers/:id
```

Parameters:
- `id` (string): The ID of the research paper to delete

## Sectors

Sectors are categories for research papers. Each sector can be associated with multiple research papers.

### Endpoints

#### Get All Sectors

```
GET /knowledge/sectors
```

Query Parameters:
- `activeOnly` (boolean, optional): If true, returns only active sectors

Response:
```json
[
  {
    "id": "60d5ec9d8e8a8d2a5c8e8a8e",
    "name": "Rural and Agri Infra",
    "slug": "rural-and-agri-infra",
    "description": "Rural and agricultural infrastructure sector",
    "active": true,
    "createdAt": "2023-01-15T10:00:00.000Z",
    "updatedAt": "2023-01-15T10:00:00.000Z",
    "paperIds": ["60d5ec9d8e8a8d2a5c8e8a8d"],
    "papers": [
      {
        "id": "60d5ec9d8e8a8d2a5c8e8a8d",
        "title": "Study on the implementation of compensatory afforestation in India",
        "description": "This paper examines the implementation of compensatory afforestation policies in India"
      }
    ]
  }
]
```

#### Get Sector by ID

```
GET /knowledge/sectors/:id
```

Parameters:
- `id` (string): The ID of the sector to retrieve

#### Get Sector by Slug

```
GET /knowledge/sectors/slug/:slug
```

Parameters:
- `slug` (string): The slug of the sector to retrieve

#### Create Sector (Admin only)

```
POST /knowledge/sectors
```

Request Body:
```json
{
  "name": "Rural and Agri Infra",
  "slug": "rural-and-agri-infra",
  "description": "Rural and agricultural infrastructure sector",
  "active": true
}
```

#### Update Sector (Admin only)

```
PATCH /knowledge/sectors/:id
```

Parameters:
- `id` (string): The ID of the sector to update

Request Body:
```json
{
  "name": "Updated name",
  "description": "Updated description"
}
```

#### Toggle Sector Status (Admin only)

```
PATCH /knowledge/sectors/:id/toggle-status
```

Parameters:
- `id` (string): The ID of the sector to toggle status

#### Delete Sector (Admin only)

```
DELETE /knowledge/sectors/:id
```

Parameters:
- `id` (string): The ID of the sector to delete
