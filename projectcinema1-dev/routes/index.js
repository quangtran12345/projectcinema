var express = require('express');
var router = express.Router();
var authorUser = require('../api/controller/authorUser')
var userController = require('../api/controller/userController')

/* GET home page. */

router.get('/', async function (req, res, next) {
  var email = {}
  var token = {}
  if (req.session.token) {
    token = req.session.token
    email = await authorUser.authorizationUser(token)
  }
  res.render('index', { title: 'Home', email: email, token: token });
});
router.get('/reg', function (req, res, next) {
  res.render('register', { title: 'Sign Up', email: "" });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login', email: ""});
});

router.get('/create', async function (req, res, next) {
  if (req.session.token) {
    var token = req.session.token
    var email = await authorUser.authorizationUser(token)
  }
  if (!email) {
    res.render('login', { title: 'Create Movie', })
  } else {
    res.render('create', { title: 'Create Movie', email: email, token: token })
  }
});

router.get('/logout', function (req, res, next) {
  res.render('login', { title: 'Logout', email: ""})
})

router.get('/detail/:id', async function (req, res, next) {
  var email = {}
  var id = req.params.id
  if (req.session.token) {
    var token = req.session.token
    email = await authorUser.authorizationUser(token)
  }
  res.render('detail', { title: 'Detail', id: id, email: email })
})

router.get('/profile', async function (req, res, next) {
  var email = {}
  var token = {}
  if (req.session.token) {
    token = req.session.token
    email = await authorUser.authorizationUser(token)
  }
  res.render('profile', { title: 'Infor', email: email, token: token })
})

router.get('/modify/:token', async function (req, res, next) {
  var token = req.params.token
  var user = await authorUser.authorizationUser(req, res, next, token);
  res.render('profile', { title: 'Infor', user: user.user, token: token })
})

router.get('/forgot',async function (req, res, next) {
  res.render('forgot', { title: 'Forgot', email: ""})
})

router.get('/api/user/reset/:token', async function (req, res, next) {
  var token = req.params.token
  var password = await userController.resetPassword(token)
  res.render('password', {title: 'Password', password: password || "",  email: ""})
})


module.exports = router;
