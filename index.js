const express = require("express");
const app = express();
const connectDB = require('./config/db');
const upload = require('express-fileupload');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(upload());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/scripts", express.static(__dirname+"/node_modules/web3.js-browser/build/"));


const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
async function ConvertCoin(usd) {
    let rs = await CoinGeckoClient.simple.price({
        ids: 'usd-coin',
        vs_currencies: 'eth'
    });
    const price = rs.data['usd-coin'].eth;
    return usd*price;
};
// ConvertCoin(25).then((data) => {
//     console.log(data);
// });
const route = require('./routes/index');
route(app);

// require("./controllers/test")(app);
connectDB();


app.listen(3000, () => {
    console.log("server runing");
});