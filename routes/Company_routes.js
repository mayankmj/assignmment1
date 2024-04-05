const express = require('express');
const router = express.Router();
const controller = require('../controllers/Get_Companies_byCurr');

router.get('/companies/public_treasury', controller.getCompaniesByCurrency);

module.exports = router;
