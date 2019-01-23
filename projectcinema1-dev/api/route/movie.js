var express = require("express");
var router = express.Router();
var fileUpload = require('express-fileupload')
var movieController = require("../controller/movieController");

router.post("/create", fileUpload(), async function (req, res, next) {
    try {
        if(req.session.token) {
            if (req.body.email) {
                if (req.files) {
                    var fileName = req.files.image.name;
                    req.body.image = '/images/' + fileName;
                    var file = req.files.image
                    file.mv('../public/images/' + fileName).catch((err) => console.log('caught it'))
                }
                const response = await movieController.createMovie(req.body)
                if (response) {
                    return res.status(200).send(response)
                } else {
                    return res.status(500).send({message: 'create fail'})
                }
            }
        } else {
            throw new Error("Login")
        }
    } catch (error) {
        res.status(500).send({message: 'Create Fail'})
    }
})

router.get("/list", async function (req, res) {
    try {
        const response = await movieController.getFilm()
        return res.send(response);
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get("/:id", async function (req, res) {
    try {
        const response = await movieController.getDetail(req.params.id)
        return res.send(response);
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

router.put("/editMovie", fileUpload(), async function (req, res) {
    try {
        var fileName 
        if (req.session.token) {
            if (req.files) {
                fileName = req.files.image.name;
                var file = req.files.image
                file.mv('../projectcinema1/public/images/' + fileName).catch((err) => console.log('caught it'))
            }
            if(fileName) {
                fileName = "/images/"+ fileName
            }
            const response = await movieController.editMovie(req, fileName)
            return res.send(response)
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

router.delete("/delete/:id", async function (req, res) {
    try {
        if (req.session.token) {
            var id = req.params.id
            const response = await movieController.deleteMovie(id)
            return res.send(response)
        }
    } catch (error) {
        throw error.message
    }
})

router.get("/search", async function (req, res) {
    try {
        var searchValue = req.body.searchValue
        const response = await movieController.searchFilm(searchValue)
        return res.send(response);
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router