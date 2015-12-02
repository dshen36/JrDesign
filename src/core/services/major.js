angular.module('gg.services')
    .factory('Major', function($http, Track) {
        function Major(data) {
            this.id = data.id;
            this.name = data.name;
            this.tracks = [];

            for (var i = 0; i < data.tracks.length; i ++) {
                this.tracks.push(new Track(data.tracks[i]));
            }
        }

        Major.getAll = function() {
            return $http.get('/assets/data/majors.json').then(
                function(response) {
                    return response.data;
                });
        }

        return Major;
    });
