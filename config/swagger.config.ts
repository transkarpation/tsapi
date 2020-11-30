import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerDefinition = {
  info: {
    // API informations (required)
    title: 'Hello World', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'A sample API', // Description (optional)
  },
  host: `localhost:8080`, // Host (optional)
  basePath: '/', // Base path (optional),
  securityDefinitions: {
    "Bearer": {
        "type": "apiKey",
        "name": "Authorization",
        "in": "header"
    }
  },
};

const options = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  // Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
  apis: ['./routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(options)

export default {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerDocs)
}