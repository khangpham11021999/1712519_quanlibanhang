const PORT=3000;
const express = require('express');
const app = express();
require('express-async-errors');
app.use(express.urlencoded({ extended:true}));
app.use('/public',express.static('public'));
// 
require('./middlewares/view.mdw')(app);
require('./middlewares/session.mdw')(app);
require('./middlewares/locals.mdw')(app);
require('./middlewares/routes.mdw')(app);
require('./middlewares/default_handling.mdw')(app);
//app listening:
app.listen(PORT,function(){
    console.log(`listening on port http://localhost:${PORT}`);
})