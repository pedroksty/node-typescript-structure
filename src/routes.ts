import { Router } from 'express'

const router = Router()

router.get('/', (request, response) => {
  response.json({ SERVER: 'ON' })
})

export default router
