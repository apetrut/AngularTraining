import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import {JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'pm-root',
  template: `
    <nav class='navbar navbar-expand navbar-dark bg-primary'>

      <div class="container">
          <a class='navbar-brand'>{{pageTitle}}</a>
          <ul class='navbar-nav mr-auto' *ngIf="loggedIn()">
            <li class='nav-item'><a class='nav-link' routerLinkActive='active'
                  [routerLink]="['/welcome']">Home</a>
            </li>
            <li class='nav-item'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
                  [routerLink]="['/products']"
                  [routerLinkActiveOptions]="{ exact : true}">Product List</a>
            </li>
            <li class='nav-item'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
                  [routerLink]="['/products/0/edit']">Add Product</a>
            </li>
            <li class='nav-item'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
                  [routerLink]="['/books']">Books</a>
            </li>
            <li class='nav-item'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
                  [routerLink]="['/books/0/edit']">Add Book</a>
            </li>
          </ul>

          <div *ngIf="loggedIn()" class="dropdown" dropdown>
            <a class="dropdown-toggle text-light" dropdownToggle>
              Welcome {{authService.decodedToken?.unique_name}}
            </a>

            <div class="dropdown-menu" *dropdownMenu>
              <a class="dropdown-item" href="#"><i class="fa fa-user"></i> Edit Profile</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" (click)="logout()"><i class="fa fa-sign-out"></i> Logout</a>
            </div>
          </div>

          <form #loginForm="ngForm" *ngIf="!loggedIn()" class="form-inline my-2 my-lg-0" (ngSubmit)="login()">
            <input class="form-control mr-sm-2" type="text" name="username" 
                  placeholder="Username" required [(ngModel)]="model.username">
            <input class="form-control mr-sm-2" type="password" name="password" 
                  placeholder="Password" required [(ngModel)]="model.password">
            <button [disabled]="!loginForm.valid" class="btn btn-success my-2 my-sm-0" type="submit">Login</button>
          </form>

      </div>

      
    </nav>
    <div class='container'>
      <router-outlet></router-outlet>
    </div>
    `,
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
                      }
                    );
  }

  loggedIn() {
    return this.authService.loggedIn();
    // return !!token; // if token!= null return true;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/welcome');
    this.alertify.message('Logged out!');
  }
}
