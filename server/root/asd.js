const express = require("express");
const router = express.Router();

router.get("/trys", (req, res) => {
    res.json({ data: ['hello'] })
});

module.exports = router;