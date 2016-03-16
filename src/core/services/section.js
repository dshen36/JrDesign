angular.module('gg.services')
    .factory('Section', function($http, Environment) {
        function Section(data) {
            this.id = data.id;
            this.courseId = data.courseId;
            this.crn = data.crn;
            this.professor = data.professor;
            this.times = data.times;
        }

        Section.getAll = function() {
            return $http.get(Environment.path + '/sections').then(
                function(response) {
                    var sections = [];

                    for (var i = 0; i < response.data.length; i ++) {
                        sections.push(new Section(response.data[i]));
                    }
                    
                    return sections;
                });
        }

        return Section;
    });
