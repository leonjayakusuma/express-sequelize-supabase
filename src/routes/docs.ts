import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from '../config/swagger'

const router = express.Router()

// Serve Swagger UI
router.use('/', swaggerUi.serve)
router.get('/', swaggerUi.setup(swaggerSpec))

// Serve raw OpenAPI JSON (useful for tooling / tests)
router.get('/json', (_req, res) => {
  res.json(swaggerSpec)
})

export default router


