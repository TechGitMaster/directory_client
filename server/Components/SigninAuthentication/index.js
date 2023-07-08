const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const accounts_column = require('../../database/account_column');
const column_accounts = accounts_column();

router.post('/signIn', async (req, res) => {
    const { email, fullName, familyName, givenName, picture_URI } = req.body;

    try{
        const findExisting = await column_accounts.find({ email: email });

        if(findExisting.length == 0){
            await new column_accounts({
                email: email,
                fullName: fullName,
                familyName: familyName, 
                givenName: givenName,
                picture_URI: picture_URI
            }).save()
        }
        
        const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h' });
        res.json({ success: true, token: token })

    }catch(e){
        console.log(e);
        res.json({ success: false })
    }
})


router.post('/authentication', auth, async (req, res) => {
    const findExisting = await column_accounts.find({ email: req.token.email });

    res.json({ success: true, data: findExisting[0] });
});


function auth(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    if(token == null) {
        res.json({ success: false })
        return;
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, tokens) => {
        if(err) {
            res.json({ success: false });
            return;
        }

        req.token = tokens;
        next();
    })
}


module.exports = router;