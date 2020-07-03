import { responseJSON } from '../src/util/responseJSON'
import { validSearch } from '../src/util/validObjects'

describe('Utils', () => {
  test('Response JSON - success', async (done) => {
    const result = responseJSON(true, 'prop-result', 'prop-message', 'prop-body')
    expect(result.type).toBe('success')
    expect(result.status).toBe(200)
    done()
  })
  test('Response JSON - error', async (done) => {
    const result = responseJSON(false, 'prop-result', 'prop-message', 'prop-body', 401)
    expect(result.type).toBe('error')
    expect(result.status).toBe(401)
    done()
  })

  test('Valid Order - Provider', async (done) => {
    const result = validSearch('silla', '', {}, 'callback')
    expect(result[0]).toBe('provider')
    done()
  })
  test('Valid Order - Query', async (done) => {
    const result = validSearch('', 'zara', {}, 'callback')
    expect(result[0]).toBe('query')
    done()
  })

  test('Valid Order - Callback', async (done) => {
    const result = validSearch('', 'zara', 'asd', '')
    expect(result[0]).toBe('query')
    expect(result[1]).toBe('callback_url')
    done()
  })
})
