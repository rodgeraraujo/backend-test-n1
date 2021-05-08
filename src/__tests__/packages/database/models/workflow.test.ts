import * as faker from 'faker'
import { Workflow } from '~/packages/database/models/workflow';

const email = faker.internet.email()

describe('User Model', () => {
  it('should add Workflow', async () => {
    const model = new Workflow()
    model.data = '{
      "name": "Shutdown",
      "description": "Shutdown the computer"
    }'
    model.steps = [
      "Press Alt + F4",
      "Select turn off computer",
      "Press ok"
    ]
    await model.save()

    const user = await Workflow.createQueryBuilder()
      .select()
      .where({ email })
      .getOne()

    expect(user).not.toBeUndefined()
    expect(user.email).toBe(email)
  })
})
