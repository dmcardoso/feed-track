const app = require('express')();
const consign = require('consign');
const moment = require('moment');

moment.locale('pt-BR');


consign()
// .include()
    .then('./config/middlewares.js')
    .then('./models')
    .then('./api')
    .then('./config/routes.js')
    .into(app);


app.listen(3032, () => {
    console.log('feedtrack-backend listening on 3032!');
    // console.log(;
    // console.log(new Date());
});
