angular.module('gg.app')
    .config(function($stateProvider) {
        $stateProvider
            .state('app.criteria', {
                url: '',
                controller: 'CriteriaCtrl',
                templateUrl: '/app/criteria/views/criteria.html',
                abstract: true,
                resolve: {
                    'Majors': function(Major) {
                        return Major.getAll();
                    },
                    'SelectedMajor': function(Me, Majors) {
                        return _.find(Majors, function(major) {
                            return major.id == Me.majorId;
                        });
                    },
                    'SelectedTracks': function(Me, SelectedMajor) {
                        var selectedTracks = {};

                        for (var i = 0; i < Me.trackIds.length; i++) {
                            var track = _.find(
                                SelectedMajor.tracks,
                                function(track) {
                                    return track.id == Me.trackIds[i];
                                });

                            if (track) {
                                selectedTracks[track.id] = track;
                            }
                        }

                        return selectedTracks;
                    },
                    'Minors': function(Minor) {
                        return Minor.getAll();
                    },
                    'SelectedMinor': function(Me, Minors) {
                        return _.find(Minors, function(minor) {
                            return minor.id == Me.minorId;
                        });
                    },

                }
            })
            .state('app.criteria.major', {
                url: '',
                controller: 'CriteriaMajorCtrl',
                templateUrl: '/app/criteria/views/criteria.major.html'
            })
            .state('app.criteria.tracks', {
                url: '/tracks',
                controller: 'CriteriaTracksCtrl',
                templateUrl: '/app/criteria/views/criteria.tracks.html'
            })
            .state('app.criteria.minor', {
                url: '/minor',
                controller: 'CriteriaMinorCtrl',
                templateUrl: '/app/criteria/views/criteria.minor.html'
            });
    });
