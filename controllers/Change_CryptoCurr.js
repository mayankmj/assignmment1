const axios = require("axios");

exports.currency_Converter = async (req, res) => {
  try {
    const { fromCurrency, toCurrency, date } = req.body;
    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
      try {
        const from_data = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${fromCurrency}/history?date=${date}`
        );
        const from_data_main = from_data.data;
        let price_1 = from_data_main?.market_data?.current_price?.usd;

        const to_data = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${toCurrency}/history?date=${date}`
        );
        const to_data_main = to_data.data;
        let price_2 = to_data_main?.market_data?.current_price?.usd;
        let converted_price_on_day = price_1 / price_2;

        res.json({
          success: true,
          data: {converted_price_on_day},
        });
        return; 
      } catch (error) {
        if (error.response && error.response.status === 429) {
          
          await new Promise((resolve) => setTimeout(resolve, 5000)); 
          retries++;
        } else {
          throw error; 
        }
      }
    }
    res.status(500).json({
      success: false,
      message: "Exceeded maximum number of retries",
      error: "Exceeded maximum number of retries",
    });
  } catch (error) {
    console.error("Finding Error during fetching the Price:", error.message);
    res.status(500).json({
      success: false,
      message: "Finding Error during fetching the Price:",
      error: error.message,
    });
  }
};
