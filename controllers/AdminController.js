const Product = require("../models/Product");
const Bill = require("../models/Bill");
const User = require("../models/User");
class AdminController {

    async product(req, res) {
        const products = await Product.find({}).lean();
        res.render("admin/product", {products});
        
    }

    async user(req, res) {
        const users = await User.find({}).lean();
        res.render("admin/user", {users});
    }

    async bill(req, res) {
        const bills = await Bill.find({}).lean();
        res.render("admin/bill", {bills});
    }

    home(req, res) {
        res.render("admin");
    }
}

module.exports = new AdminController;