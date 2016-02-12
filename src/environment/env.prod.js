'use strict'

angular.module('gg.config', [])
    .factory('Environment', function() {
        return {
            name: 'prod',
            path: '/api'
        }
    });
