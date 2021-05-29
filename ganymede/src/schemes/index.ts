import * as Joi from 'joi';
import { OrderRequest } from '../types';

const orderRequestScheme = Joi.object<OrderRequest>({
    query: Joi.string()
        .min(1)
        .max(100)
        .required(),
    provider: Joi.string()
        .min(1)
        .max(100)
        .required(),
    options: Joi.string()
        .min(1)
        .max(30)
        .required(),
    callback_url: Joi.string()
        .min(5)
        .max(250)
        .required()
});

export {
    orderRequestScheme,
};