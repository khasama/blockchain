const site = require('./site');
const admin = require('./admin');
const product = require('./product');
const user = require('./user');
const cart = require('./cart');

function route(app) {

    app.use("/admin", admin);
    app.use("/user", user);
    app.use("/product", product);
    app.use("/cart", cart);
    app.use("/", site);
}

module.exports = route;