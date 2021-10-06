const express = require("express")
const middleware = require("./utils/middleware")

const app = express()

middleware(app)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Animal Listener Activated on Port #${PORT}`))