(function appStateWrapper() {
    'use strict';

    angular
        .module('helium.app.state', [
            'helium.templates',
            'ui.router'
        ])
        .config(heliumState);

    function heliumState($stateProvider) {
        $stateProvider
            .state('helium', {
                abstract: true
            });
    }
})();
