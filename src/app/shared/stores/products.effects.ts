import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadProducts, loadProductsError, loadProductsSuccess } from './products.store';
import { catchError, map, switchMap } from 'rxjs';
import { ProductApi } from '../../products/services/product.api';

@Injectable()
export class ProductsEffects {
  readonly #actions$ = inject(Actions);
  readonly #api = inject(ProductApi);

  loadProducts = createEffect(() =>
    this.#actions$.pipe(
      ofType(loadProducts),
      switchMap(() => this.#api.loadProducts().pipe(
        map((products) => loadProductsSuccess({ products })),
        catchError(() => [loadProductsError()])
      ))
    )
  );
}
