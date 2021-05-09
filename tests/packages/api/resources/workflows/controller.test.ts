import { server } from '../../../../config/helpers'
import { Workflow } from '~/packages/database/models/workflow'

describe('Workflow Controller', () => {
  it('should list Workflows', async () => {
    const res = await server.get('/workflow')
    const { status, body } = res

    expect(status).toBe(200)
    expect(body.length >= 0).toBeTruthy()
  })

  it('should save a workflow', async () => {
    const input = {
      data: {
        name: 'Shutdown',
        description: 'Shutdown the computer',
      },
      steps: ['Press Alt + F4', 'Select turn off computer', 'Press ok'],
    }

    const res = await server.post('/workflow').send(input)
    const { status, body } = res

    expect(status).toBe(201)
    expect(body.data.name).toBe('Shutdown')
  })

  it('should update a workflow status', async () => {
    const input = {
      status: 'consumed',
    }

    const workflow = await Workflow.createQueryBuilder().select().getOne()

    const res = await server.patch(`/workflow/${workflow.uuid}`).send(input)
    const { status, body } = res

    expect(status).toBe(200)
    expect(body.message).toBe('Workflow successfully saved.')
  })

  it('should consume a workflow from queue', async () => {

    const res = await server.get('/workflow/consume')
    const { status, body } = res

    expect(status).toBe(200)
    expect(body.message).toBe('Workflow successfully consumed.')
  })
})
