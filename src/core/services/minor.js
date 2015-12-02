angular.module('gg.services')
    .factory('Minor', function($http) {
        function Minor(data) {
            this.id = data.id;
            this.name = data.name;
        }

        Minor.getAll = function() {
            return $http.get('/assets/data/minors.json').then(
                function(response) {
                    return response.data;
                });
        }

        return Minor;
    });
