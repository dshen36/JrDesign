angular.module('gg.app')
    .controller('LoginCtrl', function($scope, $state, Auth) {
        $scope.auth = new Auth({});

        $scope.login = function() {
            $scope.withErrorNotification(
                $scope.auth.login(),
                function() {
                    $scope.$emit('notification.success', 'Login success!');
                    $state.go('app.criteria.majors');
                },
                'The email and password do not match.'
            );
        }
    });
