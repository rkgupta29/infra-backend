import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GalleryFormDataInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        // Transform form data values if they exist
        if (request.body) {
            // Handle year field
            if (request.body.year) {
                const year = parseInt(request.body.year, 10);
                if (!isNaN(year)) {
                    request.body.year = year;
                }
            }

            // Handle active field
            if (request.body.active !== undefined) {
                if (request.body.active === 'true') {
                    request.body.active = true;
                } else if (request.body.active === 'false') {
                    request.body.active = false;
                }
            }
        }

        return next.handle();
    }
}
