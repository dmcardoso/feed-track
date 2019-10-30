const app = require('express')();

require('./app/middlewares/passport')(app);
require('./app/middlewares/index')(app);
require('./app/api/index')(app);

app.listen(3032, () => {
    console.log('feedtrack-backend listening on 3032!');
});
