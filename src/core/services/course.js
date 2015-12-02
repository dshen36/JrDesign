angular.module('gg.services')
    .factory('Course', function(Section, Prereq) {
        function Course(data) {
            this.id = data.id;
            this.name = data.name;
            this.subject = data.subject;
            this.courseNum = data.courseNum;
            this.credits = data.credits;
            this.prereqs = new Prereq(data.prereqs);
            this.sections = [];

            for (var i = 0; i < data.sections.length; i ++) {
                this.sections.push(new Section(data.sections[i]));
            }
        }

        return Course;
    });
