import { app } from '..'

import OrderRepository from '../repository/OrderRepository'
import ProductRepository from '../repository/ProductRepository'
import axios from 'axios'

app.listen('themisto-end', async (orderID, list) => {
  const order = await OrderRepository.findByID(orderID)
  const products = await ProductRepository.save(list)
  axios(order.callbackUrl, {
    method: 'POST'

  }).then(res => {

  }).catch(err => {
    console.log('err :>> ', err)
  })
})
