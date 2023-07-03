const express = require('express');
const router = express.Router();

const InventoryResource = require('./Components/InventoryResources');
const YearTopResource = require('./Components/YearTopResources');
const SearchTitleResource = require('./Components/SearchTitleResources');

router.use('/', YearTopResource);
router.use('/', InventoryResource)
router.use('/', SearchTitleResource);

module.exports = router;