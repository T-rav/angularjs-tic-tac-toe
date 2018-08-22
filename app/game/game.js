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
  $scope.board = {
      message : '',
      grid: [
            [{marker:' '},{marker:' '},{marker:' '}],
            [{marker:' '},{marker:' '},{marker:' '}],
            [{marker:' '},{marker:' '},{marker:' '}]
          ],
      currentPlayer: player1,
      move: function(cell){
        if(cell.marker === ' '){
          this.message = '';
          cell.marker = this.currentPlayer.marker;

          if(this.currentPlayer === player1){
            this.currentPlayer = player2;
          }else{
            this.currentPlayer = player1;
          }
          return;
        }
        this.message = 'This space is taken, please choose again.';
      },
      reset:function(){
        this.message = "Reset game!";
      }
    };
});