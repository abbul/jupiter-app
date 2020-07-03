export interface IProduct {
    sku: string
    name: string
    price: number
    // eslint-disable-next-line camelcase
    original_price: number
    category : string
    description?: string
    image?: string
    orderId: string
  };
