// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import { responseJSON } from '../utils/responseJSON'
import { Routes } from '../routes'

export class IndexController {
  /**
   * Bienvenida a jupiter-app
   */
  async welcome (req: Request, res: Response) {
    const routes = Routes.map(route => {
      return {
        method: route.method,
        route: `https://jupiter-app.herokuapp.com${route.route}`
      }
    })
    return responseJSON(true, 'welcome', 'Bienvenido a Jupiter-app', routes)
  }
}
