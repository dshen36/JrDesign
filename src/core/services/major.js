angular.module('gg.services')
    .factory('Major', function(Track) {
        function Major(data) {
            this.id = data.id;
            this.name = data.name;
            this.tracks = [];

            for (var i = 0; i < data.tracks.length; i ++) {
                this.tracks.push(new Track(data.tracks[i]));
            }
        }

        return Major;
    });
