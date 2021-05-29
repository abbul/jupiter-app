// eslint-disable-next-line no-unused-vars
import Product from '../model/Product'
// eslint-disable-next-line no-unused-vars
import { IProvider } from '../interface/IProvider'
class ProviderRepository {
    private model: any

    constructor(model: any) {
        this.model = model
    }

    async saveMany(objProduct: Array<IProvider>) {
        return await this.model.create(objProduct)
    }

    async findAll() {
        return await this.model.
    }
}

export default new ProviderRepository(Product)
