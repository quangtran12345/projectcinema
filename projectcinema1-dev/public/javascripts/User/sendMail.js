var app = angular.module('Movie')
app.controller('sendMailController',['$scope', 'apiService', function ($scope, apiService) {
    var data = {
        email: undefined,
    }
    function validation() {
        var error = false;
        if (!$scope.email) {
            error = true;
            $.notify({
                icon: 'glyphicon glyphicon-warning-sign',
                message: 'Input your email',
                z_index: 999999,
            })
        }
        return error
    }
    $scope.sendMail = function () {
        var error = validation()
        if(!error) {
            data = {
                email: $scope.email,
            }
            apiService.sendMailResetPass(data).then(function (res) {
                $.notify({
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: res.data.message,
                    z_index: 999999,
                })
                location.href = "/login"
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