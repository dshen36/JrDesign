angular.module('gg.services')
    .factory('Notifications', function($timeout) {
        var dedup = {};

        function Notifications() {
            this.notifications = [];
        }

        Notifications.prototype.notify = function(message, duration) {
            var self = this;

            if (!dedup[message]) {
                dedup[message] = true;
                self.notifications.push(message);
            }

            $timeout(
                function() {
                    delete dedup[message];
                    self.notifications.shift();
                },
                duration
            );
        }

        return Notifications;
    });
