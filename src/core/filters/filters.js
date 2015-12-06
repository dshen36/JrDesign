angular.module('gg.filters', []);

angular.module('gg.filters')
    .filter('time', function() {
        return function(input) {
            var hours = input.getHours();
            var minutes = input.getMinutes();

            if (hours > 12) {
                hours = (hours - 12).toString();
            }

            if (minutes < 10) {
                minutes = '0' + minutes.toString();
            }

            return hours + ':' + minutes;
        };
    })
    .filter('weekday', function() {
        return function(input) {
            switch (input.getDay()) {
                case 0:
                    return 'Sunday';
                case 1:
                    return 'Monday';
                case 2:
                    return 'Tuesday';
                case 3:
                    return 'Wednesday';
                case 4:
                    return 'Thursday';
                case 5:
                    return 'Friday';
                case 6:
                    return 'Saturday';
            }
        };
    });
