import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductModule } from './products/product.module';
import { BookModule } from './books/book.module';
import { AddHeaderInterceptor } from './_interceptors/add-header.interceptor';
import { LogResponseInterceptor } from './_interceptors/log-response.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { RegisterComponent } from './register/register/register.component';
import { ErrorInterceptorProvider } from './_interceptors/errorInterceptor';
import { BsDropdownModule } from 'node_modules/ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'node_modules/ngx-bootstrap/datepicker';
import { TabsModule } from 'node_modules/ngx-bootstrap/tabs';

import { appRoutes } from './routes';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/hasRole.directive';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      WelcomeComponent,
      RegisterComponent,
      AdminPanelComponent,
      HasRoleDirective
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      BsDatepickerModule.forRoot(),
      ProductModule,
      BookModule,
      TabsModule.forRoot(),
      JwtModule.forRoot({
         config: {
            tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: LogResponseInterceptor, multi: true}
    // { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
