var app = angular.module('Movie')
app.controller('profileController', ['$http', '$scope', 'apiService', function ($http, $scope, apiService) {
    $scope.user = function () {
        var token = document.getElementById("token").value
        apiService.getUserProfile(token).then(function (res) {
            $scope.userProfile = res.data.response
        }).catch(function (res) {
            console.log(res)
        })
    }
    $scope.user();
    $scope.genres = ['Action', 'Horror', 'Romantic']

    $scope.update = function () {
        var formData = new FormData
        var token = document.getElementById("token").value
        var file = $('#files')[0].files[0];
        var date = $("#datepicker").datepicker('getDate')
        $scope.userProfile.birthday = {}
        var timestamp = Math.floor(date.getTime());
        $scope.userProfile.birthday = timestamp;
        for (key in $scope.userProfile) {
            formData.append(key, $scope.userProfile[key])
        }
        
        if (file) {
            formData.append('image', file)
        }
        formData.append('token', token)
        $http.put('/api/user/userUpdate', formData, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).then(function () {
            location.href = "/profile"
        }).catch(function (res) {
            $.notify({
                icon: 'glyphicon glyphicon-warning-sign',
                message: res.data,
                z_index: 999999,
            })
        })
    }
    function validatePassword(token, oldPassword, newPassword, confirmPassword) {
        var error = false
        if (!token) {
            $.notify({
                icon: 'glyphicon glyphicon-warning-sign',
                message: "Please Login!",
            },{
                z_index: 99999999999999,
            })
            error = true;
        } else if (!oldPassword) {
            $.notify({
                icon: 'glyphicon glyphicon-warning-sign',
                message: "Old password can't empty!",
            },{
                z_index: 99999999999999,
            })
            error = true;
        } else if (!newPassword) {
            $.notify({
                icon: 'glyphicon glyphicon-warning-sign',
                message: "New password can't empty!",
            },{
                z_index: 99999999999999,
            })
            error = true;
        } else if (!confirmPassword) {
            $.notify({
                icon: 'glyphicon glyphicon-warning-sign',
                message: "Confirm password can't empty!",
            },{
                z_index: 99999999999999,
            })
            
            error = true;
        } else if (oldPassword.length < 6 || newPassword.length < 6 || confirmPassword.length < 6) {
            $.notify({
                icon: 'glyphicon glyphicon-warning-sign',
                message: "Passwords must be at least 6 characters!",
               
            },{
                z_index: 99999999999999,
            })
            
            error = true;
        } else if (newPassword !== confirmPassword) {
            $.notify({
                icon: 'glyphicon glyphicon-warning-sign',
                message: "New password is not maching!",
               
            },{
                z_index: 99999999999999,
            })
            error = true;
        }
        return error
    }
    $scope.changePassword = function () {
        var token = document.getElementById("token").value
        var oldPassword = $scope.oldPassword
        var newPassword = $scope.newPassword
        var confirmPassword = $scope.confirmPassword
        var error = validatePassword(token, oldPassword, newPassword, confirmPassword)
        if (!error) {
            var data = {
                token: token,
                oldPassword: oldPassword,
                newPassword: newPassword,
                confirmPassword: confirmPassword
            }

            apiService.changePassword(data).then(function (res) {
                
                $.notify({
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: res.data.message,
                    z_index: 999999,
                })
                location.href = "/profile"
            }).catch(function (error) {
                $.notify({
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: error.data,
                    z_index: 999999,
                })
            })
        }
    }
}])