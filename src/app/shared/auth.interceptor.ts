import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, catchError, throwError } from 'rxjs';
  import { AuthService } from '../admin/services/auth.service';
  import { Router } from '@angular/router';
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) {}
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      if (this.authService.isAuthenticated()) {
        const token = this.authService.token;
        if (token) {
          req = req.clone({
            setParams: {
              auth: token,
            },
          });
        }
      }
  
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.authService.logout();
            this.router.navigateByUrl('/admin/login');
          }
          return throwError(() => error);
        })
      );
    }
  }
  