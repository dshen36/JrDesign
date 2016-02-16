angular.module('gg.services')
    .service('Notifications', function($timeout) {
        var dedup = {};
        var self = this;

        self.notifications = [];

        function notify(notification, duration) {
            if (!dedup[notification.message]) {
                dedup[notification.message] = true;
                self.notifications.push(notification);
            }

            $timeout(
                function() {
                    delete dedup[notification.message];
                    self.notifications.shift();
                },
                duration
            );
        }

        self.notifySuccess = function(message, duration) {
            notify({ message: message, type: 'success' }, duration);
        }

        self.notifyError = function(message, duration) {
            notify({ message: message, type: 'error' }, duration);
        }
    });
