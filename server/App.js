const express = require('express');
const router = express.Router();

const InventoryResource = require('./Components/InventoryResources');
const YearTopResource = require('./Components/YearTopResources');
const SearchTitleResource = require('./Components/SearchTitleResources');
const SignInAuthentication = require('./Components/SigninAuthentication');
const RateResources = require('./Components/RateResources');


router.use('/', YearTopResource);
router.use('/', InventoryResource)
router.use('/', SearchTitleResource);
router.use('/', SignInAuthentication);
router.use('/', RateResources);


module.exports = router;