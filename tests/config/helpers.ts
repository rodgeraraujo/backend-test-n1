import app from '../../src/server'
import * as request from 'supertest'

export const server = request(app)
