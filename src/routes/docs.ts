import express from 'express'
import { swaggerSpec } from '../config/swagger'

const router = express.Router()

// Serve Swagger UI using CDN assets (works well on serverless / Vercel)
router.get('/', (_req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
    <style>
      html, body { margin: 0; padding: 0; height: 100%; }
      #swagger-ui { height: 100%; }
    </style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.onload = () => {
        window.ui = SwaggerUIBundle({
          url: '/api-docs/json',
          dom_id: '#swagger-ui'
        });
      };
    </script>
  </body>
</html>`)
})

// Serve raw OpenAPI JSON (useful for tooling / tests)
router.get('/json', (_req, res) => {
  res.json(swaggerSpec)
})

export default router


