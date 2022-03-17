const Product = require("../models/Product");
class ProductController {

    async create(req, res) {
        const file = req.files.file;
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const type = file.name.split(".")[file.name.split(".").length - 1];
        if(type === "jpg" || type === "png" || type === "jpeg" || type === "webp") {
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

    update(req, res) {
        //
    }

    delete(req, res) {
        //
    }
}

module.exports = new ProductController;