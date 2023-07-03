const express = require('express');
const router = express.Router();
const search_column = require('../../database/searchTitle_column');
const searchF = search_column();
const resources_column = require('../../database/resources_column');
const column_resources = resources_column();

//Get document title______________________________________________________________________________
router.get('/documents_Title', async (req, res) => {

    try{
        const data = await searchF.find();

        res.json({ success: true, data: data });
    }catch(e){
        res.json({ success: false });
    }

});


//Get the selected data using by id__________________________________________________________________
router.post('/getSelected', async (req, res) => {
    const { id } = req.body;
    try{
        const data = await column_resources.find({ _id: id });
        res.json({ success: true, data: data });
    }catch(e){
        res.json({ success: false });
    }
});


module.exports = router;