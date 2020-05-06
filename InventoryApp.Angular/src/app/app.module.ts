import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

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
import { appRoutes } from './routes';

@NgModule({
   declarations: [
      AppComponent,
      WelcomeComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      ProductModule,
      BookModule
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
