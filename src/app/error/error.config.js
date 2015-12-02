angular.module('gg.app')
    .config(function($stateProvider) {
        $stateProvider
            .state('app.error', {
                url: '/error',
                controller: 'ErrorCtrl',
                templateUrl: '/app/error/error.html',
                params: {
                    error: 'No error data to display.'
                }
            });
    });
