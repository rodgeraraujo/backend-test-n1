// import { NextFunction, Request, Response } from 'express'
// import * as httpStatus from 'http-status'
// import { getConnection, getRepository } from 'typeorm'
// import { Workflow } from '~/packages/database/models/workflow'
// // import { Forbidden } from '../../helpers/exceptions/forbidden'

// export const list = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
//   try {
//     const workflowRepository = getRepository(Workflow)
//     const workflow = await workflowRepository.find()

//     return res.status(201).send(workflow)
//   } catch (error) {
//     return res.status(500).send(error)
//   }
// }

// export const save = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const workflowRepository = getRepository(Workflow)
//     const workflow = await workflowRepository.save(req.body)

//     return res.status(201).send(workflow)
//   } catch (error) {
//     return res.status(500).send(error)
//   }
// }
