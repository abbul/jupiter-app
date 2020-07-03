import { Routes } from '../src/routes'

describe('Routes', () => {
  test('All routes', (done) => {
    const errors : Array<Number> = []
    Routes.forEach((route, i) => {
      if (!Object.prototype.hasOwnProperty.call(route, 'method')) {
        return errors.push(i)
      }
      if (!Object.prototype.hasOwnProperty.call(route, 'route')) {
        return errors.push(i)
      }
      if (!Object.prototype.hasOwnProperty.call(route, 'controller')) {
        return errors.push(i)
      }
      if (!Object.prototype.hasOwnProperty.call(route, 'action')) {
        return errors.push(i)
      }
    })
    expect(errors.length).toBe(0)
    done()
  })
})
