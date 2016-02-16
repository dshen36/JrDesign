angular.module('gg.services')
    .factory('Minor', function($http, Environment) {
        function Minor(data) {
            this.id = data.id;
            this.name = data.name;
            this.description = data.description;
        }

        Minor.getAll = function() {
            return $http.get(Environment.path + '/minors').then(
                function(response) {
                    var minors = [];

                    for (var i = 0; i < response.data.length; i ++) {
                        minors.push(new Minor(response.data[i]));
                    }

                    return minors;
                });
        }

        return Minor;
    });
