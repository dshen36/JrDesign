angular.module('gg.services')
    .factory('User', function($http, Major, Minor, Track) {
        function User(data) {
            this.id = data.id;
            this.majors = [];
            this.minors = [];
            this.tracks = [];

            for (var i = 0; i < data.majors.length; i ++) {
                this.majors.push(new Major(data.majors[i]));
            }

            for (var i = 0; i < data.minors.length; i ++) {
                this.minors.push(new Minor(data.minors[i]));
            }

            for (var i = 0; i < data.tracks.length; i ++) {
                this.tracks.push(new Track(data.tracks[i]));
            }
        }

        User.getCurrent = function() {
            return $http.get('/users/me').then(
                function(response) {
                    return new User(response.data);
                });
        }

        return User;
    });
