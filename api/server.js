const express = require('express');
const db = require('../data/helpers/actionModel.js');
const server = express();

server.use(express.json());

const dbRouter = require('../data/dbRouter.js');
server.use('/', dbRouter)

server.get('/', (req, res) => {
    db.get()
        .then(actions => {
            console.log(actions);
            res.status(200).json(actions);
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "The action information could not be retrieved" });
        });

});


server.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(removed => {
            if (removed) {
                res.status(200).json({ message: "Action deleted" })
            } else {
                res.status(404)
                    .json({ message: "The action with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log("error from DELETE/:id", error);
            res
                .status(500)
                .json({ error: "The action could not be removed." });
        });
});

server.put('/:id', (req, res) => {
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
                .json({ error: "The action information could not be modified." });
        });
});


module.exports = server; 