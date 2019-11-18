const express = require('express');

const SystemLogs = require('../models/system-logs');

const router = express.Router();

router.get('/', async (req, res) => {
    const id = req.query.id || req.params.id || 0;
    const limit = req.query.limit || null;
    const search = req.query.search || null;
    const page = req.query.page || 1;

    const data = {
        id,
        limit,
        search,
        page,
    };

    try {
        const result = await SystemLogs.get(data);

        res.json(result);
    } catch (msg) {
        console.log(msg);
        res.status(400).send('Bad request!');
    }
});

// return { select, save, softDelete };
module.exports = app => app.use('/registros', router);
