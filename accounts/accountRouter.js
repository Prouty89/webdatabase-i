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
    .where({ id }) 
    .first() 
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err => {
        res.json(err);
    })
});

router.post('/', validateAccount, (req, res) => {
    const accountData = req.body;
    db('accounts').insert(accountData, 'id')
    .then(([id]) => {
        db('accounts')
            .where({ id }) 
            .first() 
            .then(accounts => {
                res.status(200).json(accounts)
        });
    });
});

router.put('/:id', validateAccount, validateId, (req, res) => {
    const changes = req.body;
    db('accounts')
        .where('id, req.params.id')
        .update(changes)
        .then(count => {
            if(count > 0)
            res.status(200).json({message: `updated ${count} account`})
            else
            res.status(500).json({message: "Error updating account"})
    });
});

router.delete('/:id', (req, res) => {
    db('accounts').where({id: req.params.id })
    .del()
    .then(count => {
        res.status(200).json({message: `deleted ${count} account`})
    })
});

//MW

function validateAccount(req, res, next) {
    if (req.body) {
        next();
    } else {
        res.status(400).json({ error: "Must provide one of or both Name, Budget of Account"})
    }
}

function validateId(req, res, next) {
    const { id } = req.params;
    if (id) {
        if (req.body.id) {
            next();
        } else {
            req.body.id = Number(id);
            next();
        }
    } else {
        res.status(404).json({ error: "no account with this ID exists" })
    }
}

module.exports = router;