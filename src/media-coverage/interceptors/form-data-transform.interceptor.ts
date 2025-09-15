import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FormDataTransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        // Transform form data values if they exist
        if (request.body) {
            // Handle publicationYear
            if (request.body.publicationYear) {
                const year = parseInt(request.body.publicationYear, 10);
                if (!isNaN(year)) {
                    request.body.publicationYear = year;
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
