import { NextFunction, Request, Response } from 'express'
import * as httpStatus from 'http-status'
import { getRepository } from 'typeorm'
import { Workflow } from '~/packages/database/models/workflow'
import { WorkflowType } from '~/packages/api/common/constants'
import { Conflict } from '~/packages/api/helpers/exceptions/conflict'
import { NotFound } from '~/packages/api/helpers/exceptions/notFound'
import { BadRequest } from '~/packages/api/helpers/exceptions/badRequest'
import { InternalServer } from '../../helpers/exceptions/internalServer'

export const list = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const workflowRepository = getRepository(Workflow)
    const workflow = await workflowRepository.find()
    return res.status(201).send(workflow)
  } catch (error) {
    return next(new InternalServer(error.message))
  }
}

export const save = async (req: Request, res: Response, next: NextFunction) => {
  const input = req.body

  const workflowRepository = getRepository(Workflow)
  try {
    const workflow = await workflowRepository.save(input)

    if (!workflow) {
      return next(new BadRequest('Workflow not registered.'))
    }

    return res.status(httpStatus.OK).send(workflow)
  } catch (error) {
    return next(new BadRequest('Error'))
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid
  const { status } = req.body

  const workflowRepository = getRepository(Workflow)
  try {
    const workflow = await workflowRepository.findOne({ where: { uuid } })

    if (!workflow) {
      return next(new NotFound(`Workflow with uuid:${uuid} not found.`))
    }

    workflow.status = status

    try {
      await workflowRepository.save(workflow)

      if (workflow.status !== WorkflowType.CONSUMED) {
        const broker = await getInstance()
        await broker.publishInQueue('workflows', JSON.stringify(workflow))
      }

      return res.status(httpStatus.OK).send({ message: 'Workflow successfully saved.' })
    } catch (err) {
      return next(new Conflict(`Workflow '${workflow.uuid}' can't be saved.`))
    }
  } catch (error) {
    return next(new BadRequest('Error'))
  }
}
