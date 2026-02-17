import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Learning MVP API',
      version: '1.0.0',
      description: 'REST API for AI-powered learning platform with OpenAI integration',
      contact: {
        name: 'Avigail Cher',
        url: 'https://github.com/AvigailCher/ai-learning-mvp'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            phone: { type: 'string' }
          }
        },
        Category: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            subCategories: {
              type: 'array',
              items: { $ref: '#/components/schemas/SubCategory' }
            }
          }
        },
        SubCategory: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            categoryId: { type: 'number' }
          }
        },
        Prompt: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            userId: { type: 'number' },
            categoryId: { type: 'number' },
            subCategoryId: { type: 'number' },
            prompt: { type: 'string' },
            response: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            details: { type: 'string' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts', './src/routes/*.js']
}

export const specs = swaggerJsdoc(options)
