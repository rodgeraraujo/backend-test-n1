import * as express from 'express'
import workflowRouter from '~/packages/api/resources/workflows'

const router = express.Router()

router.use('/workflow', workflowRouter)

export default router
