angular.module('Movie', [])
    .controller('registerController', function ($scope, $http) {
        $scope.submit = function () {
            var error = false;
            if (!$scope.email) {
                $.notify({
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: 'Input your email please!',
                    z_index: 999999,
                })
                error = true
            } else if (!$scope.password) {
                $.notify({
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: 'Input your password!',
                    z_index: 999999,
                })
                error = true
            } else if ($scope.password.length < 6) {
                $.notify({
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: 'Password must more five characters!',
                    z_index: 999999,
                })
                error = true
            } else if ($scope.password !== $scope.confirm) {
                $.notify({
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: 'Password is not match!',
                    z_index: 999999,
                })
                error = true
            } else {
                const data = {
                    email: $scope.email,
                    password: $scope.password,
                }

                $http.post('/api/user/createUser', data).then(function (res) {
                    location.href = "/"
                }).catch(function (res) {
                    $scope.password = ''
                    $scope.confirm = ''
                    $.notify({
                        icon: 'glyphicon glyphicon-warning-sign',
                        message: res.data.message,
                        z_index: 999999,
                    })
                })
            }
            if (error) {
                $scope.password = ''
                $scope.confirm = ''
            }
        }
    })