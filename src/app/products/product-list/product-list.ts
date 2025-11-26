import { Component, inject } from '@angular/core';
import { ProductApi } from '../services/product.api';
import { Highlight } from '../../shared/directives/highlight';

@Component({
  selector: 'app-product-list',
  imports: [
    Highlight
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export default class ProductList {
    readonly #api = inject(ProductApi);
}
