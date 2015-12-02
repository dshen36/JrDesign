angular.module('gg.services')
    .factory('ClassTime', function() {
        function ClassTime(data) {
            this.id = data.id;
            this.begin = new Date(1970, 1, 4 + data.day, data.hour, data.minute, 0);
            this.end = new Date(this.begin.getTime() + data.duration * 60000);
            this.duration = data.duration;
        }

        return Course;
    });
