var amazon = require('../api/amazonController')


module.exports = app => {
    app.get("/", (req, res) => {
        res.send("Kokoro no Junbi OK!")
    })

    app.get("/v1/amazon", amazon.getInfoWeb)
    app.get("/v1/db", amazon.test)

};


