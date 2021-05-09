import { Conflict } from '~/packages/api/helpers/exceptions/conflict'

describe('APIException', () => {
  it('should generate an APIException', () => {
    const apiException = new Conflict()

    expect(apiException.status).toBe(409)
    expect(apiException.message).toBe('Conflict.')
    expect(apiException.errors).toEqual({})
  })
})
