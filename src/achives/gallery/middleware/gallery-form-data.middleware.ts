import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class GalleryFormDataMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // Only process POST requests to the gallery endpoint with multipart/form-data
        if (req.method === 'POST' && req.originalUrl.includes('/archives/gallery') &&
            req.headers['content-type']?.includes('multipart/form-data')) {

            // Transform form fields if they exist
            if (req.body) {
                // Handle year field
                if (req.body.year) {
                    const year = parseInt(req.body.year, 10);
                    if (!isNaN(year)) {
                        req.body.year = year;
                    }
                }

                // Handle active field
                if (req.body.active !== undefined) {
                    if (req.body.active === 'true') {
                        req.body.active = true;
                    } else if (req.body.active === 'false') {
                        req.body.active = false;
                    }
                }
            }
        }

        next();
    }
}
