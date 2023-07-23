const express = require('express');
const router = express.Router();
const resources_document = require('../../database/resources_column');
const column_resources = resources_document();
const rate_column = require('../../database/rate_column');
const column_rate = rate_column();


//Give a rate for document_______________________________________
router.post('/giveRate', async (req, res) => {
    const { email, rate, id_document } = req.body;

    try{
        const resources = await column_resources.find({ _id: id_document });

        if(resources.length > 0){

            new column_rate({
                email: email,
                rate: rate,
                id_document: id_document
            }).save().then(async (data) => {

                let map = {};
                map[`star${rate}`] = Math.floor(resources[0][`star${rate}`]+1);
                map['allRate'] = Math.floor(resources[0]['allRate']+1);

                await column_resources.updateOne({ _id: id_document }, { $set: map });

                res.json({ success: true });  
            });
        }else{
            res.json({ success: false });   
        }

    }catch(e){
        res.json({ success: false });  
    }
});


//Update rate of the user on document_________________________________________
router.post('/updateRate', async (req, res) => {
    const { email, id_document, rate } = req.body;

    try{
        let getPrev = await column_rate.find({ email: email, id_document: id_document });
        const resources = await column_resources.find({ _id: id_document });

        column_rate.updateOne({ email: email, id_document: id_document }, { $set: { rate: rate }})
        .then(async (data) => {

            let map = {};
            map[`star${getPrev[0].rate}`] = Math.floor(resources[0][`star${getPrev[0].rate}`]-1);
            map[`star${rate}`] = Math.floor(resources[0][`star${rate}`]+1);

            await column_resources.updateOne({ _id: id_document }, { $set: map });

            res.json({ success: true });  
        });
    }catch(e){  
        res.json({ success: false });  
    }
});






//Get the rate of the user on document________________________________________
router.get('/getRateDocument', async (req, res) => {
    const { email, id_document } = req.query;

    try{
        const data = await column_rate.find({ email: email, id_document: id_document });

        if(data.length > 0){
            res.json({ success: true, rate: data[0].rate });  
        }else{
            res.json({ success: true, rate: 0 });   
        }
    }catch(e){  
        res.json({ success: false });  
    }

});




module.exports = router;