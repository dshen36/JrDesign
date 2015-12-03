angular.module('gg.services')
    .factory('ClassTime', function() {
        function ClassTime(data) {
            this.id = data.id;
            this.begin = new Date(1970, 1, data.day, data.hour, data.minute, 0);
            this.end = new Date(this.begin.getTime() + data.duration * 60000);
            this.duration = data.duration;
        }

        ClassTime.prototype.hasTimeConflict = function(classTime) {
            return (classTime.begin >= this.begin && classTime.begin <= this.end) ||
                (this.begin >= classTime.begin && this.begin <= classTime.end);
        }

        return ClassTime;
    });
