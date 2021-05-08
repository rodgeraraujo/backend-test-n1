import Router from 'express-promise-router'
import { list, save, update, consume } from '~/packages/api/resources/workflows/controller'

const router = Router()

router.route('/').post(save)
router.route('/:uuid').patch(update)
router.route('/').get(list)
router.route('/consume').get(consume)

export default router
