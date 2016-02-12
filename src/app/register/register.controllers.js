angular.module('gg.app')
    .controller('RegisterCtrl', function($scope, $state, Register) {
        $scope.register = new Register({});

        $scope.signUp = function() {
            $scope.withErrorNotification(
                $scope.register.register(),
                function() {
                    $scope.$emit('notification.success', 'Registration success!');
                    $state.go('login');
                }
            );
        }
    });
