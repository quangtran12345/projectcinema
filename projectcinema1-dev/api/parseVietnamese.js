function parseName(movieName) {
    movieName = movieName.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    movieName = movieName.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    movieName = movieName.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    movieName = movieName.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    movieName = movieName.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    movieName = movieName.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    movieName = movieName.replace(/đ/g, "d");
    movieName = movieName.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    movieName = movieName.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    movieName = movieName.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    movieName = movieName.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    movieName = movieName.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    movieName = movieName.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    movieName = movieName.replace(/Đ/g, "D");
    movieName = movieName.toLowerCase();
    return movieName;
}

module.exports = {
    parseName : parseName
}