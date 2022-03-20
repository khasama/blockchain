const Product = require("../models/Product");
class SiteController {

    async home(req, res) {
        let login, cart;
        if(req.session.user !== undefined){
            login = true;
        }else{
            login = false;
        }
        if(req.session.cart === undefined){
            cart = [];
        } else {
            cart = req.session.cart;
        }
        const products = await Product.find({}).lean();
        res.render("pages", {login, products, cart: cart.length});
    }

    search(req, res) {
        //
    }

    detail(req, res) {
        const id = req.params.id;
        res.render("pages/detail", {id: id});
    }
}

module.exports = new SiteController;