import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TenantInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tenantId = this.authService.getTenantId();
    
    if (tenantId) {
      const cloned = req.clone({
        headers: req.headers.set('x-tenant-id', tenantId)
      });
      return next.handle(cloned);
    }
    
    return next.handle(req);
  }
}
