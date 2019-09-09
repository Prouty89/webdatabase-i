const express = require('express');

const AccountRouter = require('./accounts/accountRouter.js');

const server = express();

server.use('/api/accounts', AccountRouter);

server.get('/', (req, res) => {
    res.send('ZEE SERVER ES OPERATIONALZ')
})


module.exports = server;