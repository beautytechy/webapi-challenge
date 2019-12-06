const express = require('express');
const db = require('../data/helpers/actionModel.js');
const server = express();

server.use(express.json());
// const dbRouter = require('../data/dbRouter.js');

server.get('/:id', (req, res) => {
    const id = req.params.id;
    db.get(id)
        .then(project => {
            console.log(project);
            res.status(200).json(project);
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "The project information could not be retrieved" });
        });

});


server.remove('/', (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(removed => {
            if (removed) {
                res.status(200).json({ message: "Project deleted" })
            } else {
                res.status(404)
                    .json({ message: "The project with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log("error from DELETE/:id", error);
            res
                .status(500)
                .json({ error: "The project could not be removed." });
        });
});

server.update('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    db.update(id, changes)
        .then(changes => {
            res.status(200).json(changes);
        })
        .catch(error => {
            console.log("error from Update", error);
            res
                .status(500)
                .json({ error: "The post information could not be modified." });
        });
});
// server.use('/', dbRouter)

module.exports = server; 