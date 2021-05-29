import mongoose from 'mongoose'
// eslint-disable-next-line no-unused-vars
import { IProvider } from '../interface/IProvider'

export interface IProviderModel extends IProvider, mongoose.Document { };

export const ProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        ref: 'Name',
        minlength: 3,
        maxlength: 50,
        required: [true, 'The property name is required']
    },
    url: {
        type: String,
        ref: 'Url',
        minlength: 5,
        maxlength: 200,
        required: [true, 'The property url is required']
    },
    type: {
        type: String,
        ref: 'Type',
        lowercase: true,
        minlength: 1,
        maxlength: 25,
        required: [true, 'The property type is required']
    },
    category: {
        type: String,
        ref: 'Category',
        lowercase: true,
        minlength: 1,
        maxlength: 25,
        required: [true, 'The property category is required']
    }
}, {
    collection: 'Provider',
    toJSON: {
        virtuals: true
    }
})

const Provider = mongoose.model<IProviderModel>('Provider', ProviderSchema)
export default Provider
