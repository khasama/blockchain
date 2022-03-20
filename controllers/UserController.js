const User = require("../models/User");
const bcrypt = require('bcrypt');
class UserController {

    register(req, res) {
        const email = req.body.email;
        const username = req.body.username;
        const pass = req.body.password;
        bcrypt.hash(pass, 10).then(async (password) => {
            const newUser = new User({ email, username, password });
            await newUser.save();
            res.redirect("/");
        }).catch((err) => {
            console.log(err);
        });
        
    }

    async login(req, res) {
        const username = req.body.username;
        const pass = req.body.password;
        const user = await User.findOne({username});
        if(user !== null){
            bcrypt.compare(pass, user.password).then((result) => {
                if(result){
                    console.log("Success");
                    req.session.user = {usernmane : user.username, role: user.role, avatar: user.avatar};
                    res.redirect("/");
                } else {
                    res.redirect("/");
                    console.log("Failed");
                }
            });
        } else {
            res.redirect("/");
            console.log("undefined username");  
        }
    }

    async update(req, res) {
        // const id = req.body.id;
        // const name = req.body.name;
        // const description = req.body.description;
        // const price = req.body.price;
        // const slug = slugify(name);
        // let image;
        // if(req.files){
        //     const file = req.files.file;
        //     const type = file.name.split(".")[file.name.split(".").length - 1];
        //     const imgName = new Date().getTime();
        //     image = `${imgName}.${type}`;
        //     fs.unlink(`./public/img/product/${req.body.image}`, (err) => {
        //         if (!err) {
        //             file.mv(`./public/img/product/${image}`, (err) => {
        //                 if (err) {
        //                     console.log(err);
        //                 }
        //             });
        //         } else {
        //           console.log(err);
        //         }
        //     });
            
        // }else{
        //     image = req.body.image;
        // }
        // await Product.updateOne({_id: id}, {name, description, image, price, slug});
        // res.redirect("/admin/product");
    }

    async delete(req, res) {
        const id = req.body.id;
        await User.deleteOne({_id: id})
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.json(err);
            });
    }

    logout(req, res) {
        req.session.destroy((err) => {
            if(!err){
                res.redirect("/");
            }
        });
    }

    async get(req, res) {
        // const id = req.params.id;
        // const product = await Product.find({_id:id}).lean();
        // res.json(product);
    }
}

module.exports = new UserController;