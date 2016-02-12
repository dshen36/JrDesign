angular.module('gg.services')
    .factory('Auth', function($http, Environment) {
        function Auth(data) {
            this.email = data.email;
            this.password = data.password;
        }

        Auth.logout = function() {
            return $http.post(Environment.path + '/auth/logout');
        }

        Auth.prototype.login = function() {
            return $http.post(Environment.path + '/auth/login', this);
        }

        return Auth;
    });
