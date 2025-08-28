# Research Papers and Sectors Module

This module provides API endpoints for managing research papers and their sectors. It follows a similar structure to the Videos and Categories modules, where research papers can be associated with multiple sectors.

## Models

### Sector

- `id`: Unique identifier
- `name`: Name of the sector
- `slug`: URL-friendly identifier
- `description`: Optional description
- `active`: Whether the sector is active
- `papers`: Associated research papers
- `paperIds`: IDs of associated research papers

### ResearchPaper

- `id`: Unique identifier
- `image`: Image URL
- `title`: Title of the research paper
- `description`: Description of the research paper
- `link`: Link to the PDF or document
- `date`: Publication date
- `active`: Whether the research paper is active
- `sectors`: Associated sectors
- `sectorIds`: IDs of associated sectors

## API Endpoints

### Sectors

- `GET /knowledge/sectors`: Get all sectors
- `GET /knowledge/sectors/:id`: Get a specific sector by ID
- `GET /knowledge/sectors/slug/:slug`: Get a specific sector by slug
- `POST /knowledge/sectors`: Create a new sector (Admin only)
- `PATCH /knowledge/sectors/:id`: Update a sector (Admin only)
- `PATCH /knowledge/sectors/:id/toggle-status`: Toggle sector status (Admin only)
- `DELETE /knowledge/sectors/:id`: Delete a sector (Admin only)

### Research Papers

- `GET /knowledge/research-papers`: Get all research papers
- `GET /knowledge/research-papers/legacy`: Get legacy research papers data (for backward compatibility)
- `GET /knowledge/research-papers/:id`: Get a specific research paper by ID
- `GET /knowledge/research-papers/sector/:sectorId`: Get research papers by sector
- `POST /knowledge/research-papers`: Create a new research paper (Admin only)
- `PATCH /knowledge/research-papers/:id`: Update a research paper (Admin only)
- `PATCH /knowledge/research-papers/:id/toggle-status`: Toggle research paper status (Admin only)
- `DELETE /knowledge/research-papers/:id`: Delete a research paper (Admin only)

## Query Parameters

### For Sectors

- `activeOnly`: If true, returns only active sectors

### For Research Papers

- `activeOnly`: If true, returns only active research papers
- `sectorId`: Filter research papers by sector ID

## Authentication

- Public endpoints: All GET endpoints
- Protected endpoints: All POST, PATCH, and DELETE endpoints (require admin privileges)
