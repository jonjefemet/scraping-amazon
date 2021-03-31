const puppeteer = require("puppeteer");
const fs = require("fs");


module.exports = app => {
    app.get("/", (req, res) => {
        res.send("Kokoro no Junbi OK!")
    })
};


