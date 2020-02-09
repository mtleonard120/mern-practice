const router = require("express").Router();
let Query = require("../models/query.model");

router.route("/").get((req, res) => {
  Query.find()
    .then(queries => res.json(queries))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/create").post((req, res) => {
  const {username, queryInterval, queryTerms} = req.body;

  const newQuery = new Query({
    username,
    queryTerms,
    queryInterval
  });

  newQuery
    .save()
    .then(() => res.json("Query added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Query.findById(req.params.id)
    .then(query => res.json(query))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Query.findByIdAndDelete(req.params.id)
    .then(() => res.json("Query deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Query.findById(req.params.id)
    .then(query => {
      query
        .save()
        .then(() => res.json("Query updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
