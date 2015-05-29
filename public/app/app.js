(function appWrapper() {
    'use strict';

    angular
        .module('helium', [
            // Config
            'helium.config',

            // App states
            'helium.app.state',
            'helium.home.state'
        ]);
})();
