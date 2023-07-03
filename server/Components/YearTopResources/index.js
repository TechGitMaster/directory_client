const express = require('express');
const router = express.Router();
const resources_column = require('../../database/resources_column');
const column_resources = resources_column();

router.get('/getTopTreeResources', async (req, res) => {
    try{
        const data = await column_resources.find({ selectedTop: "top3" });
        res.json({ data: data, success: true });
    }catch(e){  
        res.json({ success: false });
    }

});


router.get('/getTopOthersResources', async (req, res) => {

    try{
        const data = await column_resources.find({ selectedTop: "others" });
        res.json({ data: data, success: true });
    }catch(e){  
        res.json({ success: false });
    }

});

module.exports = router;