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
            return $http.get('/assets/data/courses.json').then(
                function(response) {
                    var completedMap = {};
                    var completed = _.filter(response.data, function(data) {
                        return _.contains([1, 2, 4], data.id);
                    });
                    debugger;

                    completed.forEach(
                        function(data) {
                            completedMap[data.id] = data;
                        });

                    return completedMap;
                });
        }

        return User;
    });
