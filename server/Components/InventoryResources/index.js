const express = require('express');
const router = express.Router();
const resources_column = require('../../database/resources_column');
const column_resources = resources_column();
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'dutfzeatp',
    api_key: 916367643684954,
    api_secret: '_unAztN3J7l90QHlYMCcekmo8Ig'
});


//Get data of documents by search_______________________________________________________
router.get('/get_resources', async (req, res) => {
    const { course, search, year } = req.query;
    const skip = parseInt(req.query.skip);

    try{
        let data = '';
        let countAll = '';

        countAll = await column_resources.aggregate([
            { $search: {
                index: 'search_document',
                text: { query: search, path: 'title' }
            }},
            {
                $match: {
                  $and: [
                    { 
                        course: course,
                        yearFilter: year
                    },
                  ]
                }
            },
            { $count: "total" }
        ])

        data = await column_resources.aggregate([
            { $search: {
                index: 'search_document',
                text: { query: search, path: 'title' }
            }},
            {
                $match: {
                  $and: [
                    { 
                        course: course,
                        yearFilter: year
                    },
                  ]
                }
            },
            { $sort: {
                createdAt: -1
            }},
            { $skip: skip },
            { $limit: 10 }
        ])

        res.json({ success: true, data: data, countAll: typeof countAll === 'object' ? [...countAll].length > 0 ? [...countAll][0].total:0:countAll });
    }catch(error){
        console.log(error);
        res.json({ success: false });
    }
})


//Get data of documents by clicking Course or Title______________________________________________________
router.get('/getBy_CourseTitle', async (req, res) => {
    const { condition, titleCourse } = req.query;
    const skip = parseInt(req.query.skip);
    try{
        let obj = {};
        obj[condition === 'course' ? 'course':'titleFirstLetter'] = titleCourse;

        let data = [], countAll = 0;
        if(titleCourse !== ''){
            countAll = await column_resources.find(obj);
            data = await column_resources.find(obj).sort( { createdAt: 'descending' } ).skip(skip).limit(10);
        }else{
            countAll = await column_resources.find();
            data = await column_resources.find().sort( { createdAt: 'descending' } ).skip(skip).limit(10);
        }

        res.json({ success: true, data: data, countAll: countAll.length });
    }catch(error){
        res.json({ success: false });
    }
});





module.exports = router;

