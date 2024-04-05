const Crypto = require("../models/Crypto");
const express = require('express');
const axios = require('axios');

exports.getCryptoCurr = async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=false');
        
        const data = response.data;
        await Crypto.create({
            data: data
        });

        return {
            success: true,
            message: "Crypto Data Added in database",
        };
    } catch (error) {
        return {
            success: false,
            message: "Error occurs during  saving  data to DB",
            error: error.message,
        };
    }
};





