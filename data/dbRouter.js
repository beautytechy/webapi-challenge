const dbProject = require("../data/helpers/projectModel.js");
const express = require("express");
const router = express.Router();

router.use(express.json());

router.post("/", (req, res) => {
    const postData = req.body;
    dbProject.insert(postData)
        .then(post => {
            if (postData.name && postData.description) {
                res.status(201).json(postData);
            } else {
                res
                    .status(404)
                    .json({ error: "Please provide name and description for the post." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        });

});

module.exports = router;