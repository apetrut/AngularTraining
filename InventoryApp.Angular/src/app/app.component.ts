import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import {JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  pageTitle = 'Acme Product Management';
  isLoggedIn: boolean;
  userName: string;
  jwtHelper = new JwtHelperService();

  model: any = {}; // store our username / password.

  constructor(private router: Router, public authService: AuthService, private alertify: AlertifyService) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }

  login() {
    this.authService.login(this.model)
                    .subscribe(next => {
                      this.alertify.success('Logged in successfully.');
                      }, error => {
                        this.alertify.error(error);
                      }, () => {
                        this.router.navigate(['/products']);
                      });
  }

  loggedIn() {
    return this.authService.loggedIn();
    // return !!token; // if token!= null return true;
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out!');
    this.router.navigateByUrl('/welcome');
  }
}
