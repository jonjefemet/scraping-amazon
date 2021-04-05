const swaggerAutogen = require('swagger-autogen')()

const outputFile = './config/swagger.json'
const endpointsFiles = ['./config/routes.js']

swaggerAutogen(outputFile, endpointsFiles)