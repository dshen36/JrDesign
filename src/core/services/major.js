angular.module('gg.services')
    .factory('Major', function(Minor, Track) {
        function Major(data) {
            this.id = data.id;
            this.name = data.name;
            this.minors = [];
            this.tracks = [];

            for (var i = 0; i < data.minors; i ++) {
                this.minors.push(new Minor(data.minors[i]));
            }

            for (var i = 0; i < data.tracks; i ++) {
                this.tracks.push(new Track(data.tracks[i]));
            }
        }

        return Major;
    });
