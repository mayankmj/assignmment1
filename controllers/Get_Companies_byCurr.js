const axios = require('axios');

exports.getCompaniesByCurrency = async (req, res) => {
    try {
        const { currency } = req.body;
        const response = await axios.get(`https://api.coingecko.com/api/v3/companies/public_treasury/${currency}`);

        
        const companies = response.data?.companies;

        let listOfCompanies = [];
        companies.forEach((obj) => {
            listOfCompanies.push(obj?.name)
        });
        res.json({
            success: true,
            listOfCompanies,
        });
        console.log(listOfCompanies);
    } catch (error) {
        console.error('Error fetching companies:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error fetching companies',
            error: error.message
        });
    }
};

