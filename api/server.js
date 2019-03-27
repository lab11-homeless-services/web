const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.get('/', async (req, res) => {
    return res.status(200).json({ message: 'testing' });
});

module.exports = server;