const app = require("express")()
const consign = require("consign");
const sqlite3 = require('sqlite3').verbose();


const port = process.env.PORT || 3000

//let db = new sqlite3.Database('./db/chinook.db', (err) => {
//    if (err) {
//        console.error(err.message);
//    }
//    console.log('Connected to the chinook database.');
//});

consign()
    .include("/config/middlewares.js")
    .then("./api")
    .then("./config/routes.js")
    .then("./config/swagger.js")
    .into(app)

app.use((req, res) => {
    res.status(404).json({
        success: false,
        data: {},
        errors: [
            {
                error: "NOT_FOUND",
                status: 404,
                message: "Route not found or missing resource....."
            }
        ]
    })
})

app.listen(port, () => {
    console.log(`## Backend ejecutándose en el puerto: ${port} ## `);
});
