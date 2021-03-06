import { Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { RegisterComponent } from './register/register/register.component';
import { ProductListComponent } from './products/product-list.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { AuthGuard } from './_guards/auth.guard';
import { ProductEditGuard } from './_guards/product-edit.guard';
import { ProductEditComponent } from './products/product-edit.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookListResolver } from './_resolvers/book-list.resolver';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookEditInfoComponent } from './books/book-edit/book-edit-info.component';
import { BookEditTagsComponent } from './books/book-edit/book-edit-tags.component';
import { BookDetailResolver } from './_resolvers/book-detail.resolver';
import { BookEditGuard } from './_guards/book-edit.guard';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';

export const bookRoutes: Routes = [
  { path: 'books',
    component: BookListComponent,
    canActivate: [AuthGuard],
    resolve: { resolvedBooks: BookListResolver }
  },
  {
    path: 'books/:id',
    component: BookDetailComponent,
    resolve: { resolvedBook : BookDetailResolver }
  },
  {
    path: 'books/:id/edit',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    canDeactivate: [BookEditGuard],
    component: BookEditComponent,
    children: [
      {
        path: '', // empty path
        redirectTo: 'info',
        pathMatch: 'full'
      },
      {
        path: 'info',
        component: BookEditInfoComponent
      },
      {
        path : 'tags',
        component: BookEditTagsComponent
      }
    ]
  }
];

// define the routes for this module.
export const productRoutes: Routes = [
    { path: 'products',
      component: ProductListComponent,
      canActivate: [AuthGuard]
    },
    { path: 'products/:id', component: ProductDetailComponent },
    {
      path: 'products/:id/edit',
      canDeactivate: [ProductEditGuard],
      component: ProductEditComponent,
      // loadChildren: 'app/customers/customers.module#CustomersModule'  -> lazy
    }
  ];

// define the routes for this module.
export const appRoutes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'admin',
      component: AdminPanelComponent,
      data: {roles: ['Admin', 'Moderator']},
      canActivate: [AuthGuard]
    },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
  ];


// RESOLVER - ADD THE LINE BELOW TO ADD A RESOLVER TO A SPECIFIC PATH.
// resolve: { resolvedBooks: BookResolverService}
