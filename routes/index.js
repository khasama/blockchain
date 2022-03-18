const site = require('./site');
const admin = require('./admin');
const product = require('./product');

function route(app) {

    app.use("/admin", admin);
    app.use("/product", product);
    //app.use("/", site);
}

module.exports = route;