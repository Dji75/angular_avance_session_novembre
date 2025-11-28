import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { productsFeatureKey, productsReducer } from './shared/stores/products.store';
import { provideEffects } from '@ngrx/effects';
import { ProductsEffects } from './shared/stores/products.effects';

export const routes: Routes = [
  {
     path: 'products',
      loadChildren: () => import('./products/product-routes'),
    providers: [provideState(productsFeatureKey, productsReducer), provideEffects(ProductsEffects)]
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' }
];
