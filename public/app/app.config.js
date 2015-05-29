(function appConfigWrapper() {
    'use strict';

    angular
        .module('helium.config', [])
        .config(appConfig);

    function appConfig($locationProvider) {
        // Enabling html5 pushstate
        $locationProvider.html5Mode(true);
    }
})();
