import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'pm-root',
  template: `
    <nav class='navbar navbar-expand navbar-dark bg-dark'>
      <a class='navbar-brand'>{{pageTitle}}</a>
      <ul class='navbar-nav mr-auto'>
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
        <li class='nav-item'><a class='nav-link' (click)="logout()">Logout</a>
        </li>
      </ul>

      <div *ngIf="loggedIn()" class="dropdown">
        <a class="dropdown-toggle text-light">
          Welcome user
        </a>

        <div class="dropdown-menu">
          <a class="dropdown-item" href="#"><i class="fa fa-user"></i> Edit Profile</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#"><i class="fa fa-sign-out"></i> Logout</a>
        </div>
      </div>

      <form #loginForm="ngForm" *ngIf="!loggedIn()" class="form-inline my-2 my-lg-0" (ngSubmit)="login()">
        <input class="form-control mr-sm-2" type="text" name="username" 
               placeholder="Username" required [(ngModel)]="model.username">
        <input class="form-control mr-sm-2" type="password" name="password" 
               placeholder="Password" required [(ngModel)]="model.password">
        <button [disabled]="!loginForm.valid" class="btn btn-success my-2 my-sm-0" type="submit">Login</button>
      </form>
    </nav>
    <div class='container'>
      <router-outlet></router-outlet>
    </div>
    `,
  styleUrls: ['./app.component.css'],
  // animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  isLoggedIn: boolean;
  userName: string;

  model: any = {}; // store our username / password.

  constructor(private router: Router, private authService: AuthService) {
  }

  login() {
    this.authService.login(this.model)
                    .subscribe(next => {
                      console.log('Logged in successfully.');
                      }, error => {
                        console.log('Failed to login');
                      }
                    );
  }

  logOut(): void {
    // ensure that every existing paramter or secondary route are removed when the user logs out.
    this.router.navigateByUrl('/welcome');
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token; // if token!= null return true;
  }

  logout(){
    localStorage.removeItem('token');
    console.log('logged out!');
  }
}
