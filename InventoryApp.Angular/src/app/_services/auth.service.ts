import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { ArrayType } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jtwHelper = new JwtHelperService();
  decodedToken: any;

constructor(private http: HttpClient) {
}

login(model: any) {
  return this.http.post(this.baseUrl + 'login', model)
    .pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jtwHelper.decodeToken(user.token);
          console.log(this.decodedToken);
        }
      })
    );
}

register(user: User) {
  return this.http.post(this.baseUrl + 'register', user);
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jtwHelper.isTokenExpired(token);
}

roleMatch(allowedRoles): boolean {
  let isMatch = false;
  const userRoles = this.decodedToken.role as Array<string>;

  allowedRoles.forEach(element => {
    if (userRoles.includes(element)) {
          isMatch = true;
          return;
      }
    });

  return isMatch;
}

}
