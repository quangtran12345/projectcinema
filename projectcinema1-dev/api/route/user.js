var express = require("express")
var router = express.Router()
var fileUpload = require('express-fileupload')
var userController = require('../controller/userController')
var jwt = require('jsonwebtoken');
var passport = require('passport');
var authorUser = require('../controller/authorUser')

router.post("/createUser", async function (req, res, next) {
    try {
        var session = req.session
        const response = await userController.createUser(req.body);
        var token = jwt.sign({
            id: req.body.id,
            email: req.body.email,
        }, properties.constant.secretCode);
        session.token = token
        return res.send(response);
    } catch (Error) {
        var a = Error.message.search('duplicate')
        if (a > 0) {
            return res.status(500).send({ message: 'Email is existed, please input another email!' })
        }
    }


})

router.post("/userLogin", async function (req, res, next) {
    try {
        const response = await userController.userLogin(req, req.body)
        return res.send(response)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

router.get("/userProfile/:token", async function (req, res, next) {
    try {
        const response = await userController.userProfile(req)
        return res.send(response)
    } catch (error) {
        return res.status(500).send(error)
    }
})
router.post("/userLogout", function (req, res, next) {
    const response = userController.userLogout(req);
    return res.send(response)
})

router.put("/userUpdate", fileUpload(), async function (req, res, next) {
    try {
        var fileName
        if (req.files) {
            fileName = req.files.image.name;
            var file = req.files.image
            file.mv('../public/images/' + fileName).catch((err) => console.log('caught it'))
        }
        if (fileName) {
            fileName = "/images/" + fileName
        }
        var user = await userController.userUpdate(req, fileName)
        if(!user) {
            return res.send({message: 'Update user that bai hay thu lai'})
        }
        return res.send({message: 'Update user thanh cong'})
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

router.post("/changePass", async function (req, res, next) {
    try {
        var token = req.body.token
        var oldPassword = req.body.oldPassword
        var newPassword = req.body.newPassword
        var sessionToken = req.session.token
        const response = await userController.changePassword(token, oldPassword, newPassword, sessionToken)
        return res.send(response)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

router.post("/sendMail", async function (req, res, next) {
    try {
        var email = req.body.email
        var response = await userController.sendResetPassword(email, req.headers.host)
        return res.send({ message: "We sent you a mail, please check your email for detail!" });
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

router.post("/reset/:token", async function (req, res, next) {
    try {
        var token = req.params.token
        var response = await userController.resetPassword(token)
        return response;
    } catch (error) {
        res.status(500).send(error.message)
    }
})
router.get('/google', passport.authenticate('google', {
    scope:
    [ 'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile' ]}))

router.get('/google/callback', function (req, res, next) {
  passport.authenticate('google',async function (err, user, info) {
    if (err) {
      return res.send({ errorMessage: err })
    }
    var email = {}
    var token = {}
    if (req.session.token) {
        token = req.session.token
        email = await authorUser.authorizationUser(token)
    }
    res.render('index', { title: 'Home', email: email, token: token })
  })(req, res, next)
})

// router.post("/google", async function (req, res, next) {
//     try {
       
//         var user = {
//             email:req.body['user[email]'],
//             name:req.body['user[name]'],
//             image:req.body['user[image]'],
//         } 
        
//         var response = await userController.loginGoogle(req,user)
//         return res.send(response);
//     } catch (error) {
//         console.log(error.message)
//         return res.status(500).send(error.message)
//     }
// })


module.exports = router