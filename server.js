const app = require("express")()
const consign = require("consign");


const port = process.env.PORT || 3000



consign()
    .include("/config/middlewares.js")
    .then("./config/routes.js")
    .into(app)


app.listen(port, () => {
    console.log(`## Backend ejecutándose en el puerto: ${port} ## `);
});
