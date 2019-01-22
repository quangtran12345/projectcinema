angular.module('Movie',[]).factory('apiService',['$http',function($http){
    return {
        //List Movies
        listMovie: function () {
            return $http.get("/api/movie/list");
        },

        logoutUser: function () {
            return $http.post("/api/user/userLogout");
        },

        viewDetail:function(id) {
            return $http.get("/api/movie/"+ id)
        },

        getUserProfile:function(token) {
            return $http.get("/api/user/userProfile/" + token)
        },

        deleteMovie: function(id) {
            return $http.delete("/api/movie/delete/" + id)
        },

        searchMovie: function(searchValue) {
            return $http.get("/api/movie/search/" + searchValue)
        },

        changePassword: function(data) {
            return $http.post("/api/user/changePass", data)
        },
        sendMailResetPass: function(data) {
            return $http.post("/api/user/sendMail", data)
        },


        loginGoogle: function(token) {
            return $http.post("/api/user/loginGoogle", token).then(function () {
                location.href = "/"
            }).catch(function (error) {
                $.notify({
                    icon: 'glyphicon glyphicon-warning-sign',
                    message: error.data
                })
            })   
        }

        //Create User
        // createUser: function (formData) {
        //     return $http.post('/api/movie/create', formData, {
        //             transformRequest: angular.identity,
        //             headers: {
        //                 'Content-Type': undefined
        //             }
        //         }).then(function() {
        //             location.href = "/"
        //         })
        //     }
    }
}])
