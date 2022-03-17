const User = require('../models/User');

module.exports = (app) => {
    // app.get("/", (req, res) => {
    //     return res.render('test');
    // });

    app.post("/register", (req, res) => {
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        if(!email || !username || !password){
            res.json({ketqua: 0, errorMess: "Thiếu kìa"});
        } else {
            var user = new User({
                email: email,
                username: username,
                password: password,
                wallet: ""
            });
            user.save((err) => {
                if(err) res.json({ketqua: 0, errorMess: err});
                else res.json({ketqua: 1, user});
            });
        }
    });
}