const express = require("express")
const Animal = require("../models/animal.js")
const randomDescriptionPlaceholder = require("../models/description-random.js")
const randomAnimalPlaceholder = require("../models/animal-random.js")

const router = express.Router()

router.get("/seed", (req, res) => {
    const starterAnimals = [
          { species: "Dog", extinct: false, location: "Global", lifeExpectancy: 10},
          { species: "Cat", extinct: false, location: "Global", lifeExpectancy: 15},
          { species: "Tiger", extinct: false, location: "Africa", lifeExpectancy: 20},
          { species: "Polar Bear", extinct: false, location: "Arctic", lifeExpectancy: 20},
          { species: "T-Rex", extinct: true, location: "Pangea", lifeExpectancy: 28}]
    Animal.remove({}, (err, data) => {
      Animal.create(starterAnimals,(err, data) => {
          res.json(data);
        }
      );
    })
})

router.get("/reset", (req, res) => {
    const starterAnimals = [
          { species: "Dog", extinct: false, location: "Global", lifeExpectancy: 10},
          { species: "Cat", extinct: false, location: "Global", lifeExpectancy: 15},
          { species: "Tiger", extinct: false, location: "Africa", lifeExpectancy: 20},
          { species: "Polar Bear", extinct: false, location: "Arctic", lifeExpectancy: 20},
          { species: "T-Rex", extinct: true, location: "Pangea", lifeExpectancy: 28}]
    Animal.remove({}, (err, data) => {
      Animal.create(starterAnimals,(err, data) => {
          res.send("<html>Re-directing to your Animals...<script>window.location.href = 'http://localhost:4000/animals'</script></html>");
        }
      );
    })
})

router.get("/", (req, res) => {
    Animal.find({}, (err, animals) => {
      res.render("animals/index.ejs", { animals });
    });
  });

router.get("/new", (req, res) => {
    res.render("animals/new.ejs")
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    Animal.findByIdAndRemove(id, (err, Animal) => {
        res.redirect("/animals")
    })
})

router.put("/:id", (req, res) => {
    const id = req.params.id
    req.body.extinct = req.body.extinct === "on" ? true : false
    if(req.body.species === "") {
    req.body.species = randomDescriptionPlaceholder[Math.floor(Math.random() * randomDescriptionPlaceholder.length)] + "-" + randomAnimalPlaceholder[Math.floor(Math.random() * randomAnimalPlaceholder.length)]}
    else{
    req.body.species = req.body.species 
    }
    if(req.body.location === "") {
    req.body.location = "Removed"}
    else{
    req.body.location = req.body.location 
    }
    if(req.body.lifeExpectancy === '') {
    req.body.lifeExpectancy = 0}
    else{
    req.body.lifeExpectancy = req.body.lifeExpectancy 
    }
    Animal.findByIdAndUpdate(id, req.body, {new: true}, (err, animal) => {
        res.redirect("/animals")
    })
})

router.post("/", (req, res) => {
    req.body.extinct = req.body.extinct === "on" ? true : false
    if(req.body.species === "") {
    req.body.species = randomDescriptionPlaceholder[Math.floor(Math.random() * randomDescriptionPlaceholder.length)] + "-" + randomAnimalPlaceholder[Math.floor(Math.random() * randomAnimalPlaceholder.length)]}
    else{
    req.body.species = req.body.species 
    }
    if(req.body.location === "") {
    req.body.location = "Unknown"}
    else{
    req.body.location = req.body.location 
    }
    if(req.body.lifeExpectancy === '') {
    req.body.lifeExpectancy = Math.floor(Math.random() * 100)}
    else{
    req.body.lifeExpectancy = req.body.lifeExpectancy 
    }

    Animal.create(req.body, (err, animal) => {
        res.redirect("/animals")
    })
})

router.get("/:id/edit", (req, res) => {
    const id = req.params.id
    Animal.findById(id, (err, animal) => {
        res.render("animals/edit.ejs", {animal})
    })
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    Animal.findById(id, (err, animal) => {
        res.render("animals/show.ejs", {animal})
    })
})

module.exports = router