const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

module.exports = app => {

    app.use('/api-docs', function (req, res, next) {
        swaggerDocument.host = req.get('host');
        req.swaggerDoc = swaggerDocument;
        next();
    }, swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }))

}