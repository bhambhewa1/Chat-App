const express = require('express');
const router = express.Router();

router.post('/user/registeration', (req, res) => {
    res.send("Registered Successfully")
})

module.exports = router;