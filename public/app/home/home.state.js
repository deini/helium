(function homeStateWrapper() {
    'use strict';

    angular
        .module('helium.home.state', [
            'helium.home.controller',
            'helium.templates',
            'ui.router'
        ])
        .config(homeState);

    function homeState($stateProvider) {
        $stateProvider
            .state('helium.home', {
                url: '/',
                views: {
                    'home@': {
                        templateUrl: 'home/home.tpl.html',
                        controller: 'HomeCtrl as homeCtrl'
                    }
                }
            });
    }
})();
