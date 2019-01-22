angular.module('Movie').controller('createController', ['$http', '$scope', 'apiService', function ($http, $scope, apiService) {
    $scope.genres = ['Action', 'Horror', 'Romantic']

    function validateValue() {
        var error = false
        if (!$scope.dataMovies["name"]) {
            error = true
            $.notify({
                icon: 'glyphicon glyphicon-warning-sign',
                message: "Input your movie's name",
                z_index: 999999,
            })
        }
        return error
    }

    
    $scope.submit = function () {
        var error = validateValue(error)

        if (!error) {
            var formData = new FormData
            var email = document.getElementById("email").innerHTML
            var date = $("#datepicker").datepicker('getDate')
            $scope.dates = {}
            var timestamp = Math.floor(date.getTime());
            $scope.dates = timestamp;
            var file = $('#files')[0].files[0];
            for (key in $scope.dataMovies) {
                formData.append(key, $scope.dataMovies[key])
            }
            if (email) {
                formData.append('email', email)
            }
            formData.append('date', $scope.dates)
            if (file) {
                formData.append('image', file)
            }
            $http.post('/api/movie/create', formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function () {
                location.href = "/"
            }).catch(function (res) {
                $.notify({
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: res.data,
                    z_index: 999999,
                })
            })
        }
    }

    $scope.logout = function () {
        apiService.logoutUser().then(function () {
            location.href = "/login"
        }).catch(function (res) {
            console.log(res)
        })
    }
    $scope.cancel = function () {
        location.href = "/"
    }
}])
