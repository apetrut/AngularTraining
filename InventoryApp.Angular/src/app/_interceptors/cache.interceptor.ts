import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpResponse } from '@angular/common/http';
import { HttpCacheService } from '../shared/http-cache.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    constructor(private cacheService: HttpCacheService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // pass along non-cacheable requests + invalidate cache.
        // tslint:disable-next-line: triple-equals
        if (req.method != 'GET') {
            console.log('Invalidating cache: ' + req.method + ': ' + req.url);
            this.cacheService.invalidateCache();
            return next.handle(req);
        }

        // attemp to get a cache response.
        const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);

        if (cachedResponse) {
            console.log('Returning a cached response from url: ' + cachedResponse.url);
            console.log('The cached content is: ' + cachedResponse.body);
            return of(cachedResponse);
        }

        // send request to server and then add response to cache.
        return next.handle(req)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        console.log('Adding item ' + event + ' to cache: ' + req.url);
                        this.cacheService.put(req.url, event);
                    }
                })
            );
    }
}
