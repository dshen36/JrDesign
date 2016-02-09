angular.module('gg.services')
    .factory('Auth', function($http) {
        function Auth(data) {
            this.email = data.email;
            this.password = data.password;
        }

        Auth.logout = function() {
            return $http.post('/auth/logout');
        }

        Auth.prototype.login = function() {
            return $http.post('/auth/login', this);
        }

        return Auth;
    });
