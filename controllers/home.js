const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("<html>Re-directing to your Animals...<script>window.location.href = 'http://localhost:4000/animals'</script></html>")
})

module.exports = router