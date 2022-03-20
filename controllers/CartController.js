const Product = require("../models/Product");
const Bill = require("../models/Bill");
const CoinGecko = require('coingecko-api');

class CartController {
    

    async add(req, res) {
        const id = req.params.id;
        
        const quantity = req.params.quantity;
        const product = await Product.findOne({_id:id});
        const cart = {
            id: product._id,
            name: product.name,
            price: product.price,
            quantity: quantity
        };
        
        if(req.session.cart === undefined){
            req.session.cart = [];
            req.session.cart.push(cart);
        }else{
            let index = -1;
            req.session.cart.find((item, i) => {
                if(item.id == id){
                    index = i;
                }
            });
            if(index >= 0){
                req.session.cart[index].quantity++ ;
            }else{
                req.session.cart.push(cart);
            }
            
        }
        
        res.redirect("/");
    }

    update(req, res) {
    
    }

    delete(req, res) {
        
    }

    async convert(req, res) {
        const usd = req.params.price;
        const CoinGeckoClient = new CoinGecko();
        let rs = await CoinGeckoClient.simple.price({
            ids: 'usd-coin',
            vs_currencies: 'eth'
        });
        const price = rs.data['usd-coin'].eth;
        res.json(usd*price);
    }

    async payment(req, res) {
        const cart = req.session.cart;
        const totalPrice = req.body.total;
        const wallet = req.body.wallet;
        const newBill = new Bill({ detail: cart, totalPrice, wallet });
        newBill.save();
        req.session.cart = [];
        res.json("Payment success");
    }

    home(req, res){
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
        res.render("pages/cart", {login, cart: cart.length, carts: cart});
    }

}

module.exports = new CartController;