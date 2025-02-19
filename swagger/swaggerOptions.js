
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-Commerce API',
            version: '1.0.0',
            description: 'API for managing products and categories in an e-commerce system.'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ],
        components: {
            schemas: {
                Product: {
                    type: 'object',
                    properties: {
                        name: { type:'string' },
                        description: { type:'string' },
                        price: { type: 'number' },
                        category: { type:'string', ref: 'Category' },
                    },
                    required: ['name', 'description', 'price', 'category']
                },
                Category: {
                    type: 'object',
                    properties: {
                        name: { type:'string' },
                        description: { type:'string' },
                    },
                    required: ['name', 'description']
                },
                User: {
                    type: 'object',
                    properties: {
                        firstName: { type:'string' },
                        lastName: { type:'string' },
                        email: { type:'string' },
                        password: { type:'string' },
                    },
                    required: ['firstName', 'lastName', 'email', 'password']
                }
            },
            responses: {
                Unauthorized: {
                    description: 'Unauthorized',
                },
                NotFound: {
                    description: 'Not Found',
                }
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            { bearerAuth: [] }
        ]
    },
    apis: ['./routes/*.js', './swagger/swaggerDocs.js']
}

module.exports = swaggerOptions;