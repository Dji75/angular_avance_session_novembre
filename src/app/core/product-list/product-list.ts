import { Component, inject } from '@angular/core';
import { ProductApi } from '../services/product.api';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export default class ProductList {
    readonly #api = inject(ProductApi);
}
