'use strict';

angular.module('app.game', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/game', {
    templateUrl: 'game/game.html',
    controller: 'GameController'
  });
}])
.controller('GameController', function($scope) {
  var player1 = {name:'Player 1', marker:'X'};
  var player2 = {name:'Player 2', marker:'O'};
  $scope.message = 'Howdy';
  $scope.currentPlayer = player1;
  $scope.move = function(cell){
    if(cell.marker === ' '){
      $scope.message = 'x';
      cell.marker = $scope.currentPlayer.marker;

      if($scope.currentPlayer === player1){
        $scope.currentPlayer = player2;
      }else{
        $scope.currentPlayer = player1;
      }
      return;
    }
    $scope.message = 'This space is taken, please choose again.';   
  };

  $scope.board = [
    [{marker:' '},{marker:' '},{marker:' '}],
    [{marker:' '},{marker:' '},{marker:' '}],
    [{marker:' '},{marker:' '},{marker:' '}]
  ],

  $scope.foo = 'bar';
  $scope.reset = function(){
    $scope.foo = 'foobar';
    $scope.message = 'hi, there!';
    $scope.currentPlayer = player2;
  }
});