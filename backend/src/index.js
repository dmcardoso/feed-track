const app = require('express')();
const moment = require('moment');

moment.locale('pt-BR');

require('./app/middlewares/index')(app);
require('./app/api/index')(app);

app.listen(3032, () => {
    console.log('feedtrack-backend listening on 3032!');
    // console.log(;
    // console.log(new Date());
});
