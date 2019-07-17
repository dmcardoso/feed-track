const app = require('express')();
const consign = require('consign');
const path = require('path');

consign()
// .include()
    .then('./config/middlewares.js')
    .then('./models')
    .then('./api')
    .then('./config/routes.js')
    .into(app);


app.listen(3032, () => {
    console.log('feedtrack-backend listening on 3032!');
});
