angular.module('gg.app')
    .factory('User', function($http) {
        function User(data) {
            this.id = data.id;
            this.majorId = data.majorId;
            this.minorId = data.minorId;
            this.trackIds = data.trackIds;
        }

        User.getMe = function() {
            return $http.get('/assets/data/user.json').then(
                function(response) {
                    return new User(response.data);
                });
        }

        User.prototype.getCompletedCourses = function() {
            return {};
        }

        return User;
    });
