import { Routes } from '@angular/router';

export enum RoutePaths {
  ProductsList = '',
  ProductsDetails = ':id',
  ProductCreate = 'create',
}

export default [
  {
    path: RoutePaths.ProductsList,
    loadComponent: () => import('./product-list/product-list'),
    data: {
      tartapion: { alouette: 'test' }
    }
  },
  {
    path: RoutePaths.ProductCreate,
    loadComponent: () => import('./product-create/product-create'),
  },
  {
    path: RoutePaths.ProductsDetails,
    loadComponent: () => import('./product-detail/product-detail'),
  },
  // {
  //   path: RoutePaths.ProductCreate,
  //   loadComponent: () => import('./products/product-create/product-create'),
  // },
  // {
  //   path: RoutePaths.ProductsList,
  //   children: [
  //     {
  //       path: '',
  //       loadComponent: () => import('./products/product-list/product-list'),
  //     },
  //     {
  //       path: RoutePaths.ProductsDetails,
  //       loadComponent: () => import('./products/product-detail/product-detail'),
  //     },
  //   ]
  // },
] satisfies Routes
