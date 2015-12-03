angular.module('gg.services')
    .factory('Minor', function($http) {
        function Minor(data) {
            this.id = data.id;
            this.name = data.name;
            this.description = data.description;
        }

        Minor.getAll = function() {
            return $http.get('/assets/data/minors.json').then(
                function(response) {
                    var minors = [];

                    response.data.forEach(
                        function(data) {
                            minors.push(new Minor(data));
                        });

                    return minors;
                });
        }

        return Minor;
    });
