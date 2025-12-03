const express = require('express')
require('dotenv').config()
const cors = require("cors")
const app = express()
const taskRouter = require("./routes/taskRoute")
const { testConnection } = require("./config/db")
testConnection()


app.use(cors())
app.use(express.json())


port = process.env.PORT || 7000


app.use("/api/tasks", taskRouter)


app.listen(port, () => {
    console.log(`Server Runing On http://localhost:${port}`)
})