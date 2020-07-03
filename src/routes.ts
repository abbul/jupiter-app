import { OrderController } from './controller/OrderController'
import { ProductController } from './controller/ProductController'
import { IndexController } from './controller/IndexController'

/**
 * Expone todos los "endpoints" posibles en la API.
 */
export const Routes = [
  {
    method: 'get',
    route: '/',
    controller: IndexController,
    action: 'welcome'
  },
  {
    method: 'post',
    route: '/api/product/search',
    controller: OrderController,
    action: 'create'
  },
  {
    method: 'get',
    route: '/api/product/search-order/:order_id',
    controller: OrderController,
    action: 'read'
  }, {
    method: 'get',
    route: '/api/product/search-orders',
    controller: OrderController,
    action: 'readMany'
  }, {
    method: 'get',
    route: '/api/product/category/:product_category_id',
    controller: ProductController,
    action: 'readForProductCategoryID'
  }
]
