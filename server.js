const express = require('express');

const server = express();
server.use(express.json());
const Accounts = require('./data/accounts-model');

//might want to add require json

server.post("/budget/accounts", (req, res) => {
    const { name, budget } = req.body;
    Accounts.add({
        name,
        budget
    })
        .then(response => {
            res.status(201).json({ name, budget });
        })
        .catch(error => {
            res.status(500).json({
                error: "There was an error while posting to the database"
            });
        });
});

server.get("/budget/accounts", (req, res) => {
    Accounts.find()
        .then(accounts => {
            res.status(200).json({ accounts });
        })
        .catch(error => {
            res.status(500).json({ error: "Accounts could not be retrieved" })
        });
});

server.get("/budget/accounts/:id", (req, res) => {
    const { id } = req.params;
    Accounts.findById(id)
        .then(account => {
            res.status(200).json({ account });
        })
        .catch(error => {
            res.status(500).json({ error: "Account could not be retrieved." })
        });
});

server.put("/budget/accounts/:id", (req, res) => {
    const { id } = req.params;
    const { name, budget } = req.body;
    Accounts.update(id, { name, budget })
        .then(response => {
            res.status(200).json({ name, budget });
        })
        .catch(error => {
            res.status(500).json({ error: "Account could not be updated" });
        });
});

server.delete("/budget/accounts/:id", (req, res) => {
    const { id } = req.params;
    Accounts.remove(id)
        .then(response => {
            res.json({ message: "Account Successfully Removed" });
        })
        .catch(error => {
            res.status(500).json({ message: "Error removing user" });
        });
});


module.exports = server;