const express = require('express');
const router = express.Router();
const {currency_Converter} = require('../controllers/Change_CryptoCurr');

router.post('/price', currency_Converter);

module.exports = router;
