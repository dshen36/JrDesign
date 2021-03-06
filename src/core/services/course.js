angular.module('gg.services')
    .factory('Course', function($http, Environment) {
        function Course(data) {
            this.id = data.id;
            this.name = data.name;
            this.description = data.description;
            this.isCompleted = data.isCompleted;
            this.sections = [];
        }

        Course.getAll = function(user) {
            return $http.get(Environment.path + '/courses').then(
                function(response) {
                    var courses = [];

                    for (var i = 0; i < response.data.length; i ++) {
                        courses.push(new Course(response.data[i]));
                    }

                    return courses;
                });
        }

        Course.prototype.addSection = function(section) {
            this.sections.push(section);
        }

        return Course;
    });
