angular.module('gg.app')
    .config(function($locationProvider, $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $urlRouterProvider
            .when('/', '/app')
            .when('', '/app')
            .otherwise('/app');

        $urlMatcherFactoryProvider.strictMode(false);

        $stateProvider
            .state('app', {
                url: '/app',
                controller: 'AppCtrl',
                templateUrl: '/app/app.html',
                abstract: true
            });
    })
    .run(function($rootScope, $log, $state) {
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            $log.warn('There has been an error changing states', error);
            $state.go('app.error', { error: error.stack });
        });
    });
