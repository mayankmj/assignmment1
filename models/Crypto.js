const mongoose = require("mongoose")

const cryptoSchema = new mongoose.Schema({
    id: String,
    name: String
});

const cryptoCurrenciesSchema = new mongoose.Schema(
  {
      data : [cryptoSchema]
   } ,

  { timestamps: true }
  
)


module.exports = mongoose.model("crypto",cryptoCurrenciesSchema )
