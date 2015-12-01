angular.module('gg.services')
    .factory('Course', function(Professor) {
        function Course(data) {
            this.id = data.id;
            this.crn = data.crn;
            this.name = data.name;
            this.time = new Date(data.time);
            this.length = data.length;
            this.credits = data.credits;
            this.prereqs = data.prereqs;
            this.professor = new Professor(data.professor);
        }

        return Course;
    });
