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
                abstract: true,
                resolve: {
                    'Me': function(User) {
                        return User.getMe();
                    },
                    'Courses': function(Me, Course) {
                        return Course.getAll(Me);
                    }
                }
            });
    })
    .run(function($rootScope, $log, $state) {
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            $log.warn('There has been an error changing states', error);
            $state.go('app.error', { error: error.stack });
        });

        $rootScope.getSections = function(items, size) {
            var sections = [];
            var section;

            for (var i = 0; i < items.length; i ++) {
                if (i % size == 0) {
                    section = [];
                    sections.push(section);
                }

                section.push(items[i]);
            }

            return sections;
        }
    });
