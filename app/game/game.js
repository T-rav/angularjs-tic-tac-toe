'use strict';

angular.module('app.game', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/game', {
    templateUrl: 'game/game.html',
    controller: 'GameCtrl'
  });
}])
.controller('GameController', function($scope) {
  var player1 = 'X';
  $scope.board = {
    grid: [
            [' ',' ',' '],
            [' ',' ',' '],
            [' ',' ',' ']
          ],
    currentPlayer: player1
    };
});