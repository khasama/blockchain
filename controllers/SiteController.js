class SiteController {

    home(req, res) {
        res.render("pages");
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