import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';
import { Product } from '../models/product';
import { RequestState } from '../models/request-state';

export const loadProducts = createAction('[Products] Load products');
export const loadProductsSuccess = createAction(
  '[Products] Load products with success',
  props<{ products: Product[] }>()
);
export const loadProductsError = createAction('[Products] Load products with error');



export interface ProductsState { products: Product[]; loadingState: RequestState }
export const initialState: ProductsState = { products: [], loadingState: RequestState.Initial };
export const productsReducer = createReducer(
  initialState,
  on(loadProducts, (state: ProductsState) => ({ ...state, loadingState: RequestState.Loading })),
  on(loadProductsSuccess, (state: ProductsState, action) => ({
    ...state,
    loadingState: RequestState.Success,
    products: action.products,
  })),
  on(loadProductsError, (state: ProductsState) => ({ ...state, loadingState: RequestState.Error, products: [] })),
);

export const productsFeatureKey = 'products';
const productsFeature = createFeatureSelector<ProductsState>(productsFeatureKey)

const selectLoadingState = createSelector(productsFeature, ({ loadingState }) => loadingState);
const selectProducts = createSelector(productsFeature, ({ products }) => products);


export const productsSelectors = {
  products: selectProducts,
  loadingState: selectLoadingState,
}
