import { OrderController } from './controller/OrderController'

export const Routes = [{
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
  controller: OrderController,
  action: 'readForProductCategoryID'
}
]
