const path = require('path');

module.exports = {
    upload_dir: path.resolve(__dirname, '..', 'uploads'),
    models_dir: path.resolve(__dirname, '..', 'api', 'models'),
    images_url: 'images/',
};
