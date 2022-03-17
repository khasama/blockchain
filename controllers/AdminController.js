const Product = require("../models/Product");
class AdminController {

    async product(req, res) {
        const products = await Product.find({}).lean();
        res.render("admin/product", {products});
    }

    user(req, res) {
        res.render("admin/user");
    }

    bill(req, res) {
        res.render("admin/bill");
    }

    home(req, res) {
        res.render("admin");
    }
}

module.exports = new AdminController;