const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { upload_dir } = require('../../config/paths');

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());
    app.use('/images', express.static(upload_dir));
};
