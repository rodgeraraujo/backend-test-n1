import * as httpStatus from 'http-status'
import { APIException } from './APIException'

export class InternalServer extends APIException {
  constructor(errors?: any, message?: string) {
    super(errors, message || 'Internal Server Error.', httpStatus.INTERNAL_SERVER_ERROR)
  }
}
