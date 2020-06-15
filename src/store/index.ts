import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Dispatch } from 'react';
import thunk from 'redux-thunk';
import { getAllProducts } from '../helpers/api';
import productsReducer, { setProducts } from './products';
import paginationReducer from './pagination';
import sortReducer from './sort';
import loadingReducer from './loading';
import queryReducer from './query';
import favouritesReducer from './favourites';
import cartReducer from './cart';
import productReducer from './product';

export const getPage = (state: RootState) => state.pagination.page;
export const getPerPage = (state: RootState) => state.pagination.perPage;
export const getSortField = (state: RootState) => state.sort;
export const getQuery = (state: RootState) => state.query;
export const getQuantity = (
  state: RootState,
  type: string,
) => state.products
  .filter((product: Products) => product.name.toLowerCase().includes(state.query.toLowerCase()))
  .filter((product: Products) => product.type === type).length;

export const getVisible = (state: RootState) => state.loading.isVisible;
export const getLoading = (state: RootState) => state.loading.isLoading;
export const getProducts = (state: RootState) => state.products;
export const getFavourites = (state: RootState) => state.favourites;
export const getProduct = (state: RootState) => state.product;


const rootReducer = combineReducers({
  products: productsReducer,
  pagination: paginationReducer,
  sort: sortReducer,
  loading: loadingReducer,
  query: queryReducer,
  favourites: favouritesReducer,
  cart: cartReducer,
  product: productReducer,
});


export type RootState = ReturnType<typeof rootReducer>;


export const getVisibleProducts = (state: RootState, type: string) => {
  let compare: (a: Products, b: Products) => number = () => 0;

  switch (state.sort.field) {
    case 'name':
      compare = (a: Products, b: Products) => a.name.localeCompare(b.name);
      break;
    case 'age':
    case 'price':
      compare = (a: any, b: any) => a[state.sort.field] - b[state.sort.field];
      break;
    default:
      break;
  }

  const visibleProducts = state.products
    .filter((product: Products) => product.type === type)
    .filter((product: Products) => product.name.toLowerCase().includes(state.query.toLowerCase()))
    .sort(compare);

  const { page, perPage } = state.pagination;

  const start = (page - 1) * perPage;
  const end = page * perPage;

  return visibleProducts.slice(start, end);
};

export const loadData = () => {
  return async (dispatch: Dispatch<unknown>) => {
    try {
      const productsFromServer = await getAllProducts();

      dispatch(setProducts(productsFromServer));
    } catch (error) {
      // do something to catch error
    }
  };
};

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState') || '')
  : {};

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk)),
);

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});


export default store;
