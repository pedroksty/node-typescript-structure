import { Router } from 'express'
import UserController from '@controllers/UserController'



const router = Router()

router.get('/', (request, response) => {
  response.json({ SERVER: 'ON' })
})

router.post('/users', UserController.store)
router.get('/users', UserController.index)
router.get('/users/:id', UserController.show)
router.delete('/users', UserController.delete)
router.put('/users', UserController.update)


export default router
