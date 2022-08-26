const Product = require("../models/Product");
const fs = require('fs');
class ProductController {

    async create(req, res) {
        const file = req.files.file;
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const type = file.name.split(".")[file.name.split(".").length - 1];
        if (type === "jpg" || type === "png" || type === "jpeg" || type === "webp") {
            const imgName = new Date().getTime();
            const image = `${imgName}.${type}`;
            const newProduct = new Product({ name, description, image, price });
            await newProduct.save();
            file.mv("./public/img/product/" + image, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect("/admin/product");
                }
            });
        }

    }

    async update(req, res) {
        const id = req.body.id;
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const slug = slugify(name);
        let image;
        if (req.files) {
            const file = req.files.file;
            const type = file.name.split(".")[file.name.split(".").length - 1];
            const imgName = new Date().getTime();
            image = `${imgName}.${type}`;
            fs.unlink(`./public/img/product/${req.body.image}`, (err) => {
                if (!err) {
                    file.mv(`./public/img/product/${image}`, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                } else {
                    console.log(err);
                }
            });

        } else {
            image = req.body.image;
        }
        await Product.updateOne({ _id: id }, { name, description, image, price, slug });
        res.redirect("/admin/product");
    }

    async delete(req, res) {
        const id = req.body.id;
        await Product.deleteOne({ _id: id })
            .then((data) => {
                fs.unlink(`./public/img/product/${req.body.img}`, (err) => {
                    if (!err) {
                        res.json(data);
                    }
                });

            })
            .catch((err) => {
                res.json(err);
            });
    }

    async get(req, res) {
        const id = req.params.id;
        const product = await Product.find({ _id: id }).lean();
        res.json(product);
    }
    async detail(req, res) {
        let login, cart;
        if (req.session.user !== undefined) {
            login = true;
        } else {
            login = false;
        }
        if (req.session.cart === undefined) {
            cart = [];
        } else {
            cart = req.session.cart;
        }
        const id = req.params.id.match(/^[0-9a-fA-F]{24}$/);
        const product = await Product.find({ _id: id }).lean();
        res.render("pages/detail", { product, login, cart: cart.length });
    }
}

function slugify(string) {
    return string
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
}
module.exports = new ProductController;