angular.module('gg.services')
    .factory('Section', function(Professor, ClassTime) {
        function Section(data) {
            this.id = data.id;
            this.crn = data.crn;
            this.professor = new Professor(data.professor);
            this.classTimes = [];

            for (var i = 0; i < data.classTimes.length; i ++) {
                this.classTimes.push(new ClassTime(data.classTimes[i]));
            }
        }

        return Section;
    });
