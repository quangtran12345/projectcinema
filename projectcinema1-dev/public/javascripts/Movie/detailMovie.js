var app = angular.module('Movie')
app.controller('detailController', ['$http', '$scope', 'apiService', function ($http, $scope, apiService) {
    $scope.genres = ['Choose for genre','Action', 'Horror', 'Romantic']
    function checkAuthor (author) {
        var email = document.getElementById("email").innerHTML;
        
        if(email === author.email) {
            var btnUpdate = document.getElementById("btnUpdate");
            var btnDelete = document.getElementById("btnDelete");
            btnUpdate.style.display = "inline"
            btnDelete.style.display = "inline"
        }
    }
    $scope.load = function () {
        var id = document.getElementById('id').innerHTML;
        $scope.detailMovie = {}
        apiService.viewDetail(id).then(function (res) {
        $scope.detailMovie = res.data.movies
        checkAuthor(res.data.movies)
        }).catch(function (res) {
            console.log(res)
        })
    }
    $scope.load()

    function validateValue() {
        var error = false
        if (!$scope.detailMovie["name"]) {
            error = true
            $.notify({
                icon: 'glyphicon glyphicon-warning-sign',
                message: "Input your movie's name",
                z_index: 999999,
            })
        }
        return error
    }
    
    $scope.editMovie = function () {
            var error = validateValue(error)
            if (!error) {
                var formData = new FormData
                var id = document.getElementById("id").innerHTML
                var date = $("#datepicker").datepicker('getDate')
                $scope.detailMovie.date = {}
                var timestamp = Math.floor( date.getTime());
                $scope.detailMovie.date = timestamp;
                var file = $('#files')[0].files[0];
                for (key in $scope.detailMovie) {
                    formData.append(key, $scope.detailMovie[key])
                }
                formData.append("id", id)
                if (file) {
                    formData.append('image', file)
                } else { 
                    file = undefined;
                }
                $http.put('/api/movie/editMovie', formData, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                }).then(function () {
                    location.href = "/"
                }).catch(function (res) {
                    console.log(res)
                })
            }
        } 
    
    $scope.deleteMovie = function () {
        var email = document.getElementById("email").innerHTML
        var author = document.getElementById("author").value
        if (email === author) {
            var id = document.getElementById("id").innerHTML
            apiService.deleteMovie(id).then(function() {
                location.href = "/"
            }).catch(function () {
                $.notify({
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: "delete fail!",
                    z_index: 999999,
                })
            })

        } else {
            $.notify({
                icon: 'glyphicon glyphicon-warning-sign',
                message: "You can't update for this movie.",
                z_index: 999999,
            })
        }
    }
    $scope.showFormEdit = function () {
        var x = document.getElementsByClassName("label-detailMovie");
        var y = document.getElementsByClassName("input-detailMovie");
        var btnEdit = document.getElementById("btnEdit");
        var btnUpdate = document.getElementById("btnUpdate");
        var btnCancel = document.getElementById("btnCancel");
        var changeButton = document.getElementById("change-button");
        var email = document.getElementById("email").innerHTML
        var author = document.getElementById("author").value;
        var btnCancel1 = document.getElementById("btnCancel1");

        if (email === author) {
            for(i=0; i < x.length; i++) {
                x[i].style.display = "none";
                y[i].style.display = "block";
            }
            btnEdit.style.display = "inline";
            btnCancel.style.display = "inline";
            changeButton.style.display = "block";
            btnUpdate.style.display = "none";
            btnCancel1.style.display = "block";
        } else {
            $.notify({
                icon: 'glyphicon glyphicon-warning-sign',
                message: "You can't update for this movie.",
                z_index: 999999,
            })
        }
    }
    $scope.cancelFormEdit = function () {
        var x = document.getElementsByClassName("label-detailMovie");
        var y = document.getElementsByClassName("input-detailMovie");
        var btnEdit = document.getElementById("btnEdit");
        var btnCancel = document.getElementById("btnCancel");
        var changeButton = document.getElementById("change-button");
        var btnCancel1 = document.getElementById("btnCancel1");

        for(i=0; i < x.length; i++) {
            x[i].style.display = "block";
            y[i].style.display = "none";
        }
        btnEdit.style.display = "none";
        btnCancel.style.display = "none";
        changeButton.style.display = "none";
        btnCancel1.style.display = "none";
        btnUpdate.style.display = "block";
       
    }
}])