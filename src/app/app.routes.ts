import { Routes } from '@angular/router';

export const routes: Routes = [
  {
     path: 'products',
      loadChildren: () => import('./products/product-routes'),
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' }
];
