(function homeCtrlWrapper() {
    'use strict';

    angular
        .module('helium.home.controller', [])
        .controller('HomeCtrl', HomeCtrl);

    function HomeCtrl() {
        var Ctrl = this;

        Ctrl.hello = 'Hello World';
    }
})();
