angular.module('gg.services')
    .factory('Course', function($http) {
        function Course(data) {
            this.id = data.id;
            this.name = data.name;
            this.isCompleted = data.isCompleted;
        }

        Course.getAll = function(user) {
            return $http.get('/courses').then(
                function(response) {
                    var courses = [];

                    for (var i = 0; i < response.data.length; i ++) {
                        courses.push(new Course(response.data[i]));
                    }

                    return courses;
                });
        }

        return Course;
    });
