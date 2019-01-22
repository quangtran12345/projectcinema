var express = require("express")
var router = express.Router()
var userController = require('../controller/userController')
var validate = require("../validate")
var responseStatus = require("../responseStatus")
var jwt = require('jsonwebtoken');
var secretCode = require("../properties")
router.post("/sign-up", async function (req, res, next) {
    try {
        var email = req.body.email
        var password = req.body.password
        validate.userValidate(email, password)
        const user = await userController.createUser(req.body);
        var token = jwt.sign({email: user.email},secretCode.constant.secretCode)
        return res.send(responseStatus.Code200({message: "Đăng ký thành công", user:user, token: token}))
    } catch (error) {
        return res.status(400).send(error)
    }
})

router.post("/sign-in", async function (req, res, next) {
    try {
        var email = req.body.email
        var password = req.body.password
        
        validate.validateLogin(email, password)

        const user = await userController.userLogin(email, password)
        
        if (!user) {
            throw responseStatus.Code400({errorMessage: "Email hoặc mật khẩu của bạn không đúng"})
        }
        user.password = undefined;
        var token = jwt.sign({
            id: user.id,
            email: user.email, name: user.name, image: user.image,
            description: user.description, birthday: user.birthday
        }, secretCode.constant.secretCode);
        req.session.token = token
        return res.send(responseStatus.Code200({message: "Đăng nhập thành công", user:user, token: token}))
    } catch(error) {
        return res.status(400).send(error)
    }
})


module.exports = router