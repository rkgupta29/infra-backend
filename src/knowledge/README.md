# Knowledge Module

This module provides API endpoints for managing knowledge-related content, including research papers and their sectors.

## Submodules

### Research Papers

The research papers module manages academic papers and reports. Each research paper can be associated with multiple sectors, similar to how videos are associated with categories in the archives module.

See [Research Papers README](./research-papers/README.md) for more details.

### Sectors

The sectors module manages the categorization of research papers. Sectors are similar to categories in the archives module but specifically for research papers.

## API Documentation

### Research Papers

- `GET /knowledge/research-papers`: Get all research papers
- `GET /knowledge/research-papers/legacy`: Get legacy research papers data (for backward compatibility)
- `GET /knowledge/research-papers/:id`: Get a specific research paper by ID
- `GET /knowledge/research-papers/sector/:sectorId`: Get research papers by sector
- `POST /knowledge/research-papers`: Create a new research paper (Admin only)
- `PATCH /knowledge/research-papers/:id`: Update a research paper (Admin only)
- `PATCH /knowledge/research-papers/:id/toggle-status`: Toggle research paper status (Admin only)
- `DELETE /knowledge/research-papers/:id`: Delete a research paper (Admin only)

### Sectors

- `GET /knowledge/sectors`: Get all sectors
- `GET /knowledge/sectors/:id`: Get a specific sector by ID
- `GET /knowledge/sectors/slug/:slug`: Get a specific sector by slug
- `POST /knowledge/sectors`: Create a new sector (Admin only)
- `PATCH /knowledge/sectors/:id`: Update a sector (Admin only)
- `PATCH /knowledge/sectors/:id/toggle-status`: Toggle sector status (Admin only)
- `DELETE /knowledge/sectors/:id`: Delete a sector (Admin only)
