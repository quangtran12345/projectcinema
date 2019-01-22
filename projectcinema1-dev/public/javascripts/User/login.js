angular.module('Movie', []).controller('loginController', function ($scope, $http) {
    var data = {
        email: undefined,
        password: undefined,
    }
    function validation() {
        var error = false;
        if (!$scope.email) {
            error = true;
            $.notify({
                icon: 'glyphicon glyphicon-warning-sign',
                message: "Input your email!",
                z_index: 999999,
            })
            
        } else if (!$scope.password) {
            error = true;
            $.notify({
                icon: 'glyphicon glyphicon-warning-sign',
                message: "Input your password",
                z_index: 999999,
            })
        }
        return error
    }
    $scope.submit = function () {
        var error = validation()
        if(!error) {
            data = {
                email: $scope.email,
                password: $scope.password,
            }
            $http.post('/api/user/userLogin', data).then(function () {
                location.href = "/"
            }).catch(function (error) {
                $scope.email = ''
                $scope.password = ''
                $.notify({
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: error.data,
                    z_index: 999999,
                })
            })
        }
    }
    
    
    
})