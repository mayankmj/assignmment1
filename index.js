const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");
const changeCrypto_curr_routes = require("./routes/Change_Crypto");
const companyRoutes = require('./routes/Company_routes');

const { getCryptoCurr } = require("./controllers/Get_CryptoCurr");
const Crypto = require("./models/Crypto");

const dbConnect = require("./config/database");

require("dotenv").config();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json()); 
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

app.use("/api", changeCrypto_curr_routes);
app.use('/api', companyRoutes);

async function startServer() {
    await dbConnect();
    await myHourlyFunction();
    setInterval(myHourlyFunction, 120000);
    app.listen(PORT, () => {
        console.log(`App is started at Port no ${PORT}`);
    });
}

app.get("/", (req, res) => {
    res.send(`<h1>This is Server-Side Application to convert prices of Cryptocurrencies.</h1>`);
});

async function myHourlyFunction() {
    console.log('Running myHourlyFunction...');
    const data = await Crypto.find({});
    if (!data || data.length === 0) {
        console.log(data);
        console.log("adding first time");
        getCryptoCurr();
    } else {
        console.log("updating...");
        console.log(data);
        const p = await Crypto.deleteMany({});
        console.log(p);
        console.log("data updated");
        getCryptoCurr();
    }
}

startServer();
