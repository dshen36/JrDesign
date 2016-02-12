angular.module('gg.services')
    .factory('Register', function($http) {
        function Register(data) {
            this.email = data.email;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.password = data.password;
        }

        Register.prototype.register = function() {
            return $http.post('/users', this);
        }

        return Register;
    });
