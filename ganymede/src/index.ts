import 'reflect-metadata'
// eslint-disable-next-line no-unused-vars
import express, { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { Routes } from './routes'
require('dotenv').config({ path: '.env' })

export const app = express()

mongoose.connect(process.env.URL_DB || '', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, () => {
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json({}))

  Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
      const result = (new (route.controller as any)())[route.action](req, res, next)
      if (result instanceof Promise) {
        result.then(result => result !== null && result !== undefined ? res.status(result.status).send(result) : undefined)
      } else if (result !== null && result !== undefined) {
        res.json(result)
      }
    })
  })

  app.listen(3000)
  console.log('APP-listening...')
}).catch((error: any) => console.info(error))
