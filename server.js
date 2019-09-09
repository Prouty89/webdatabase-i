const express = require('express');

const AccountRouter = require('./accounts/accountRouter.js');

const server = express();

server.use('/api/accounts', express.json(), AccountRouter, logger);

server.get('/', (req, res) => {
    res.send('ZEE SERVER ES OPERATIONALZ')
})

function logger(req, res, next) {
    const method = req.method;
    const url = req.url;
    const timestamp = Date.now();
    console.log(`${method} request to '${url}' at ${timestamp}`);
    next()
};


module.exports = server;