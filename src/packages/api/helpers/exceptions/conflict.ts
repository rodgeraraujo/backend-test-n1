import * as httpStatus from 'http-status'
import { APIException } from './APIException'

export class Conflict extends APIException {
  constructor(errors?: any, message?: string) {
    super(errors, message || 'Conflict.', httpStatus.CONFLICT)
  }
}
