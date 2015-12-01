angular.module('gg.services')
    .factory('Track', function() {
        function Track(data) {
            this.id = data.id;
            this.name = data.name;
        }

        return Track;
    });
