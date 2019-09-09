const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.select('*')
    .from('accounts')
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err => {
        res.json(err);
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
    .where({ id }) //always returns an array
    .first() // picks the first element of the resulting array
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err => {
        res.json(err);
    })
});

router.post('/', (req, res) => {
    // insert into accounts()
    const accountData = req.body;
    //validate the accountData before inserting into db

    db('accounts').insert(accountData, 'id')
    .then(([id]) => {
        db('accounts')
            .where({ id }) //always returns an array
            .first() // picks the first element of the resulting array
            .then(accounts => {
                res.status(200).json(accounts)
        });
    });
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    db('accounts')
        .where('id, req.params.id')
        .update(changes)
        .then(count => {
            res.status(200).json({message: `updated ${count} records`})
    });
});

router.delete('/:id', (req, res) => {
    db('accounts').where({id: req.params.id })
    .del()
    .then(count => {
        res.status(200).json({message: `deleted ${count} records`})
    })
});

module.exports = router;