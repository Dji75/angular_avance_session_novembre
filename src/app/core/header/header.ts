import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoutePaths } from '../../products/product-routes';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly RoutePaths = RoutePaths;
}
