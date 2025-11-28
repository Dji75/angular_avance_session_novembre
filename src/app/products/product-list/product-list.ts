import { Component, inject } from '@angular/core';
import { ProductApi } from '../services/product.api';
import { Highlight } from '../../shared/directives/highlight';
import { Store } from '@ngrx/store';
import { loadProducts, productsSelectors } from '../../shared/stores/products.store';
import { AsyncPipe } from '@angular/common';
import { RequestState } from '../../shared/models/request-state';

@Component({
  selector: 'app-product-list',
  imports: [
    Highlight,
    AsyncPipe
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export default class ProductList {
    // readonly #api = inject(ProductApi);
  readonly #store = inject(Store);

  protected readonly products$ = this.#store.select(productsSelectors.products);

  protected readonly products = this.#store.selectSignal(productsSelectors.products);

  protected readonly loadingState = this.#store.selectSignal(productsSelectors.loadingState);

  loadProducts() {
    this.#store.dispatch(loadProducts())
  }

  protected readonly RequestState = RequestState;
}
