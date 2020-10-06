import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';


export class AddHeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request to add the new header
        const token = JSON.parse(localStorage.getItem('jwtToken'));
        if (token) {
            const clonedRequest = req.clone({ headers: req.headers.set('Authorization', token) });
            // Pass the cloned request instead of the original request to the next handle
            return next.handle(clonedRequest);
        } else {
            return next.handle(req);
        }
    }
}
