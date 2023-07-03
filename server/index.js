require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const App = require('./App');


//This is just for second option if header in vercel.json have an error when uploading to vercel________________________
//this is only for local___________________________________
/*const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3000', 'https://thesisary.vercel.app']
}));*/



// Set up options response for preflight requests
//app.options('*', cors());

app.use(express.json())
app.use('/', App)


const database = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI, 
            { useNewUrlParser: true, useUnifiedTopology: true });
    }catch(err){
        console.error(err);
    }
}
database();



//this is only for local___________________________________
/*mongoose.connection.once('open', () => { 
    app.listen(4000 || process.env.PORT)    
});*/



//this is only for vercel__________________________________
module.exports = app

