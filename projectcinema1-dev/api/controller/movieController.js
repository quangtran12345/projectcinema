var mongoose = require('mongoose');
var Movie = mongoose.model('Movies');
var parseVietnamese = require('../parseVietnamese')

function convertLink(id, name) {
    name = parseVietnamese.parseName(name)
    name = name.replace(" ", "-")
    id =id.slice(-5, id.length)
    return name + "-" + id
}

async function createMovie(data) {
    let movie = new Movie(data);
    var id = movie._id.toHexString()
    var name = movie.name
    movie.linkMovie = convertLink(id, name)
    await movie.save()
    return { movie: movie }
}

async function getFilm() {
    const movies = await Movie.find().sort({ _id: -1 });
    return { movies: movies }
}

async function getDetail(id) {
    const movies = await Movie.findOne({linkMovie:id});
    return { movies: movies }
}

async function editMovie(req, fileName) {
    const movie = await Movie.findOne({linkMovie:req.body.id})
    if (!movie) {
        throw new Error("Movie isn't exist !")
    }
    var name = req.body.name
    movie.linkMovie = convertLink(req.body.id, name)
    movie.name = req.body.name || movie.name
    movie.genre = req.body.genre || movie.genre
    movie.date = req.body.date || movie.date
    movie.content = req.body.content || movie.content
    movie.image = fileName || movie.image
    await movie.save()
    return { message: "success" }
}

async function deleteMovie(linkMovie) {
    const movies = await Movie.findOne({linkMovie:linkMovie})
    if (!movies) {
        throw new ("Movie not exist !")
    }
    await movies.remove()
    return { message: "success" }
}

module.exports = {
    createMovie: createMovie,
    getFilm: getFilm,
    getDetail: getDetail,
    editMovie: editMovie,
    deleteMovie: deleteMovie
}