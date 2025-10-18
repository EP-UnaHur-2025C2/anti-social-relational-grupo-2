const express = require("express")
const app = express()
const db = require("../db/models")
require('dotenv').config()

const PORT = process.env.PORT || 3000

const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load("./docs/swagger.yaml");

const userRouter = require("./routes/userRoutes")
const postRouter = require("./routes/postRoutes")
const imagesRouter = require("./routes/post_imagesRoutes")
const commentRouter = require("./routes/commentRoutes")
const tagRouter = require("./routes/tagRoutes")

app.use(express.json())
app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/images", imagesRouter)
app.use("/comments", commentRouter)
app.use("/tags", tagRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(PORT, async () => {
    await db.sequelize.sync()
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
})
