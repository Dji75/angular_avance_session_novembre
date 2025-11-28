import { inject, Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductApi {
  private readonly httpClient = inject(HttpClient);

  loadProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('https://fakestoreapi.com/products');
  }
}
