const router = require("express").Router();
const db = require("../data/dbConfig.js");

router.get("/", (req, res) => {
  db("categories")
    .then(categories => {
      res.status(200).json(categories);
    })
    .catch(error => {
      res.status(500).json({ message: error, error });
    });
});

module.exports = router;
