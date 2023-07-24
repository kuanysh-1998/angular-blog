import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { IFbAuthResponse, IUser } from 'src/app/shared/interfaces';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): string | null {
    const tokenExpiration = localStorage.getItem('fb-token-exp');

    if (tokenExpiration === null) {
      this.logout();
      return null;
    }

    const expDate = new Date(Date.parse(tokenExpiration));

    if (new Date() > expDate) {
      this.logout();
      return null;
    }

    return localStorage.getItem('fb-token');
  }

  login(user: IUser): Observable<any> {
    user.returnSecureToken = true;
    return this.http
      .post<any>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAJA7p6uzaR0S4R03LL2jixzBYseOxxeOo`,
        user
      )
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;
    alert(message);

    return throwError(error);
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: IFbAuthResponse | null) {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + +response.expiresIn * 1000
      );

      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
