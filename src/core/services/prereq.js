angular.module('gg.services')
    .factory('Prereq', function(Section) {
        function Prereq(data) {
            this.id = data.id;
            this.op = data.op;
            this.courseIdLeft = data.courseIdLeft;
            this.courseIdRight = data.courseIdRight;
            this.childPrereq = data.childPrereq;
            this.satisfied = false;

            /* recursively build prereqs */
            if (data.childPrereq) {
                this.childPrereq = new Prereq(data.childPrereq);
            }
        }

        return Prereq;
    });
