import * as dotEnvSafe from 'dotenv-safe'
import * as path from 'path'

if (process.env.NODE_ENV !== 'production') {
  const envPath = '.env'

  dotEnvSafe.config({
    allowEmptyValues: true,
    example: path.resolve(__dirname, '../../.env.example'),
    path: path.resolve(process.cwd(), envPath),
  })
}

interface Config {
  readonly DB: {
    readonly AUDIT_SCHEMA: string
    readonly HOST: string
    readonly MAIN_SCHEMA: string
    readonly NAME: string
    readonly PASSWORD: string
    readonly PORT: number
    readonly USER: string
  }
  readonly RABBITMQ: {
    readonly USER: string
    readonly PASSWORD: string
    readonly HOST: string
    readonly PORT: string
    readonly URL: string
  }
  readonly LOGGING: {
    readonly TYPE: string
    readonly LEVEL: string
    readonly ERROR_FILE: string
    readonly COMBINED_FILE: string
  }
  readonly NODE_ENV: string
  readonly SERVER_PORT: number
}

const {
  DB_HOST,
  DB_AUDIT_SCHEMA,
  DB_MAIN_SCHEMA,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  RABBITMQ_USER,
  RABBITMQ_PASSWORD,
  RABBITMQ_HOST,
  RABBITMQ_PORT,
  LOGGING_COMBINED_FILE,
  LOGGING_ERROR_FILE,
  LOGGING_LEVEL,
  LOGGING_TYPE,
  NODE_ENV,
  SERVER_PORT,
} = process.env

const config: Config = {
  DB: {
    AUDIT_SCHEMA: DB_AUDIT_SCHEMA,
    HOST: DB_HOST,
    MAIN_SCHEMA: DB_MAIN_SCHEMA,
    NAME: DB_NAME,
    PASSWORD: DB_PASSWORD,
    PORT: parseInt(DB_PORT, 10),
    USER: DB_USERNAME,
  },
  LOGGING: {
    COMBINED_FILE: LOGGING_COMBINED_FILE,
    ERROR_FILE: LOGGING_ERROR_FILE,
    LEVEL: LOGGING_LEVEL,
    TYPE: LOGGING_TYPE,
  },
  RABBITMQ: {
    USER: RABBITMQ_USER,
    PASSWORD: RABBITMQ_PASSWORD,
    HOST: RABBITMQ_HOST,
    PORT: RABBITMQ_PORT,
    URL: `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`,
  },
  NODE_ENV,
  SERVER_PORT: parseInt(SERVER_PORT, 10),
}

export default config
