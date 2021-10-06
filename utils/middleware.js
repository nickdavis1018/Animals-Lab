require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const AnimalRouter = require("../controllers/animal.js")
const HomeRouter = require("../controllers/home.js")

const middleware = (app) => {app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use("/animals", AnimalRouter)
app.use("/", HomeRouter)
}

module.exports = middleware