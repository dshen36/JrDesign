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
                }
            );
        }

        User.prototype.addMajor = function(major) {
            this.majors.push(major);
        }

        User.prototype.addTrack = function(track) {
            this.tracks.push(track);
        }

        User.prototype.addMinor = function(minor) {
            this.minors.push(minor);
        }

        User.prototype.saveMajors = function() {
            return $http.post('/users/me/majors', this.majors);
        }

        User.prototype.saveTracks = function() {
            return $http.post('/users/me/tracks', this.tracks);
        }

        User.prototype.saveMinors = function() {
            return $http.post('/users/me/majors', this.minors);
        }

        return User;
    });
