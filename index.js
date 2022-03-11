const express = require("express");
const app = express();
const connectDB = require('./config/db');
const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");



app.use(bodyParser.urlencoded({extended:false}));


require("./controllers/test")(app);
connectDB();


app.listen(3000, () => {
    console.log("server runing");
});