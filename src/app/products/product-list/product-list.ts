import { Component, inject } from '@angular/core';
import { Highlight } from '../../shared/directives/highlight';
import { Store } from '@ngrx/store';
import { loadProducts, productsSelectors } from '../../shared/stores/products.store';
import { AsyncPipe } from '@angular/common';
import { RequestState } from '../../shared/models/request-state';
import { ProductCard } from '../product-card/product-card';
import { Router } from '@angular/router';
import { RoutePaths } from '../product-routes';


@Component({
  selector: 'app-product-list',
  imports: [
    Highlight,
    AsyncPipe,
    ProductCard
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export default class ProductList {
  readonly #store = inject(Store);
  readonly #router = inject(Router);

  protected readonly products$ = this.#store.select(productsSelectors.products);

  protected readonly products = this.#store.selectSignal(productsSelectors.products);

  protected readonly loadingState = this.#store.selectSignal(productsSelectors.loadingState);

  loadProducts() {
    this.#store.dispatch(loadProducts())
  }

  protected readonly RequestState = RequestState;

  seeDetails($event: string) {
    this.#router.navigate(['/', 'products', $event]);
  }
}
