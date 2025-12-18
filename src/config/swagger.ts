import swaggerJsdoc from 'swagger-jsdoc'

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express Sequelize Supabase API',
    version: '1.0.0',
    description: 'API documentation for the Express + Sequelize + Supabase project',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local dev server',
    },
  ],
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key',
        description: 'API key required for all /api and /api/protected endpoints',
      },
    },
  },
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
}

export const swaggerOptions: swaggerJsdoc.Options = {
  swaggerDefinition,
  apis: ['src/app.ts', 'src/routes/*.ts', 'src/controllers/*.ts'],
}

export const swaggerSpec = swaggerJsdoc(swaggerOptions)


