angular.module('gg.services')
    .factory('Minor', function() {
        function Minor(data) {
            this.id = data.id;
            this.name = data.name;
        }

        return Minor;
    });
