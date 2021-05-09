import { Workflow } from '~/packages/database/models/workflow'

describe('Workflow Model', () => {
  it('should add Workflow', async () => {
    const model = new Workflow()
    model.data = JSON.stringify({
      name: 'Shutdown',
      description: 'Shutdown the computer',
    })

    model.steps = ['Press Alt + F4', 'Select turn off computer', 'Press ok']
    const saved = await model.save()

    const workflow = await Workflow.createQueryBuilder().select().where({ uuid: saved.uuid }).getOne()

    expect(workflow).not.toBeUndefined()
    expect(workflow.uuid).toBe(saved.uuid)
  })
})
