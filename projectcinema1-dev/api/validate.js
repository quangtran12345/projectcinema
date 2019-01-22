const responseStatus = require("./responseStatus")

const userValidate = function (email, password) {
    if(!email) {
        throw responseStatus.Code400({
            errorMessage: responseStatus.EMAIL_REQUIRED
        })
    }

    if(!password) {
        throw responseStatus.Code400({
            errorMessage: "Mật khẩu không được để trống"
        })
    }

    if(password.length < 6) {
        throw responseStatus.Code400({
            errorMessage: "Mật khẩu không được ít hơn 6 ký tự"
        })
    }

    const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    if(!emailRegex.test(email)) {
        throw responseStatus.Code400({
            errorMessage: "Email phải đúng định dạng"
        })
    }
    
}

const validateLogin = function (email, password) {
    if(!email) {
        throw responseStatus.Code400({
            errorMessage: responseStatus.EMAIL_REQUIRED
        })
    }

    const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    if(!emailRegex.test(email)) {
        throw responseStatus.Code400({
            errorMessage: "Email phải đúng định dạng"
        })
    }

    if(!password) {
        throw responseStatus.Code400({
            errorMessage: "Mật khẩu không được để trống"
        })
    }

    if(password.length < 6) {
        throw responseStatus.Code400({
            errorMessage: "Mật khẩu không được ít hơn 6 ký tự"
        })
    }
}

const validateCreate = function (name) {
    if(!name) {
        throw responseStatus.Code400({errorMessage: "Tên phim không được để trống"})
    }
}

module.exports = {
    userValidate: userValidate,
    validateLogin: validateLogin,
    validateCreate: validateCreate
}