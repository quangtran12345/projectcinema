var express = require("express")
var router = express.Router()
var movieController = require('../controller/movieController')
var fileUpload = require('express-fileupload')
var validate = require("../validate")
var responseStatus = require("../responseStatus")
var jwt = require('jsonwebtoken');
var secretCode = require("../properties")
var userController = require('../controller/userController')

router.post("/", fileUpload(), async function (req, res, next) {
    try {  
        var token = req.headers.token
        if (token) {
            var email = jwt.verify(token, secretCode.constant.secretCode).email
            var user = await userController.checkUser(email)
            if(user) {
                if (req.files) {
                    var fileName = req.files.image.name;
                    req.body.image = '/images/' + fileName;
                    var file = req.files.image
                    file.mv('../projectcinema1/public/images/' + fileName)
                }
            var movie = await movieController.createMovie(req.body)
            res.send({movie:movie})
            }
        } else {
            res.send({status: 400,error: "Đăng nhập để tạo phim"})
        }
    
    } catch (error) {
        res.status(400).send({error:error})
    }
})

module.exports = router