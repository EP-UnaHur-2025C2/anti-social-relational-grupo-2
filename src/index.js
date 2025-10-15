const express = require("express")
const app = express()
const db = require("../db/models")

const PORT = process.env.PORT || 3000

app.use(express.json())

app.listen(PORT, async () => {
    await db.sequelize.sync()
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
})
