const express = require("express");
const app = express();
const connectDB = require('./config/db');
const upload = require('express-fileupload');
const session = require('express-session');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(upload());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/scripts", express.static(__dirname+"/node_modules/web3.js-browser/build/"));
app.use(session({
    "cart": [],
    "secret": "khaprovcl",
    "resave": true,
    "saveUninitialized": true
}));
app.use("/admin", (req, res, next) => {
    if(req.session.user !== undefined){
        if(req.session.user.role === 0){
            next();
        } else {
            res.redirect("/");
        }
    }else{
        res.redirect("/");
    }
    
});


const route = require('./routes/index');
route(app);

// require("./controllers/test")(app);
connectDB();


app.listen(3000, () => {
    console.log("server runing");
});