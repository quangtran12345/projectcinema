var mongoose = require('mongoose');
var schema = mongoose.Schema;
var todoSchema = new schema({
    email: {type : String, unique: true},
    image: {type : String, default: "/images/avartar.png"},
    password: {type : String},
    name: {type : String},
    birthday: {type : String},
    description: {type : String}
})
var userModel = mongoose.model("User", todoSchema);
module.exports = userModel;