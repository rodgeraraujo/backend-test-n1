import { Connection, Channel, connect, Message } from 'amqplib'

export default class RabbitmqServer {
  private conn: Connection
  private channel: Channel

  constructor(private uri: string) {}

  async start(): Promise<void> {
    this.conn = await connect(this.uri)
    this.channel = await this.conn.createChannel()
  }

  async publishInQueue(queue: string, message: string) {
    return this.channel.sendToQueue(queue, Buffer.from(message))
  }

  async readMessageFromQueue(queue: string) {
    this.channel.prefetch(1)
    const message = await this.channel.get(queue).then(msg => {
      if (msg) {
        console.log(msg.content.toString())
        this.channel.ack(msg)
        return JSON.parse(msg.content.toString())
      }
    })

    console.log('message', message)

    return message
  }
}
