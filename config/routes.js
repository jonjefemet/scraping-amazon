var amazon = require('../api/amazonController')


module.exports = app => {
    app.get("/", (req, res) => {

        throw 'Parameter is not a number!';        
        res.status(401).send("Nombre / contraseña inválido!")
        //res.send("Kokoro no Junbi OK!")
    })

    app.get("/v1/amazon", amazon.getInfoWeb)
};


