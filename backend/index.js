const app = require('express')();
const consign = require('consign');

consign()
// .include()
    .then('./config/middlewares.js')
    .then('./models/base-model.js')
    .then('./models')
    .then('./api')
    .then('./config/routes.js')
    .exclude('./models/query-builder.js')
    .into(app);


app.listen(3000, () => {
    console.log('feedtrack-backend listening on 3000!');
});
