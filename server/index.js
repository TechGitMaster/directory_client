const express = require('express');
const app = express();
const asd = require('./root/asd');

app.use('/', asd)


/*//this is only for local___________________________________
app.listen(4000 || process.env.PORT)
*/

//this is only for vercel__________________________________
module.exports = app

