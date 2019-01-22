var mongoose = require('mongoose');
var schema = mongoose.Schema;
var todoSchema = new schema({
    userId: {type: String},
    name: {type: String},
    genre: {type: String},
    date: {type: String, default: Date.now()},
    content: {type: String},
    image: {type: String, default:"/images/video-play.png"},
    email: {type: String},
    linkMovie: {type: String},
}) 

var moviesModel = mongoose.model("Movies", todoSchema);
module.exports = moviesModel; 