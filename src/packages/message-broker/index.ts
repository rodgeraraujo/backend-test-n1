import config from '~/config'
import RabbitmqServer from '~/packages/message-broker/rabbitmqServer'

let instance: RabbitmqServer

export async function getInstance(): Promise<RabbitmqServer> {
  if (!instance) {
    instance = new RabbitmqServer(config.RABBITMQ.URL)
    await instance.start()
  }
  return instance
}