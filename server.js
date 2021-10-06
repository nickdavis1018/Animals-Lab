require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")

const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

mongoose.connect(DATABASE_URL, CONFIG)

mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
const {Schema, model} = mongoose

const animalSchema = new Schema({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number,
})

const Animal = model("Animal", animalSchema)

const app = express()
/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.send("Welcome to the Animals App!")
})

app.get("/animals", (req, res) => {
    Animal.find({}, (err, animals) => {
      res.render("animals/index.ejs", { animals });
    });
  });

app.get("/animals/seed", (req, res) => {
    const starterAnimals = [
          { species: "Tiger", extinct: false, location: "Africa", lifeExpectancy: 20},
          { species: "Dog", extinct: false, location: "Global", lifeExpectancy: 10},
          { species: "Polar Bear", extinct: false, location: "Arctic", lifeExpectancy: 25}]

    Animal.remove({}, (err, data) => {
      Animal.create(starterAnimals,(err, data) => {
          res.json(data);
        }
      );
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Animal Listener Activated on Port #${PORT}`))