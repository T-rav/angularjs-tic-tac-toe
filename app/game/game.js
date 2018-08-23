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
            [{marker:' ', disabled:false},{marker:' ', disabled:false},{marker:' ', disabled:false}],
            [{marker:' ', disabled:false},{marker:' ', disabled:false},{marker:' ', disabled:false}],
            [{marker:' ', disabled:false},{marker:' ', disabled:false},{marker:' ', disabled:false}]
          ],
      currentPlayer: player1,
      move: function(cell){
        if(cell.marker === ' '){
          this.message = '';
          cell.marker = this.currentPlayer.marker;

          if(this.hasWinner(this.grid)){
            this.message = this.currentPlayer.name + ' is the winner!';
            this.disableBoard();
            return;
          }
          // then set message and ignore clicks
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
        this.currentPlayer = player1;
        for(var i = 0; i < 3; i++){
          for(var x = 0; x < 3; x++){
            this.grid[i][x].marker = ' ';
            this.grid[i][x].disabled = false;
          }
        }
      },
      hasWinner:function(grid){
        // check row win
        for(var i = 0; i < 3; i++){
          if(grid[i][0].marker === grid[i][1].marker && grid[i][1].marker === grid[i][2].marker && grid[i][0].marker != ' ' ){
            return true;
          }
        }

        // check column win
        for(var i = 0; i < 3; i++){
          if(grid[0][i].marker === grid[1][i].marker && grid[1][i].marker === grid[2][i].marker && grid[0][i].marker != ' ' ){
            return true;
          }
        }

        // check diagonal win
        if(grid[0][0].marker == grid[1][1].marker && grid[1][1].marker == grid[2][2].marker && grid[0][0].marker != ' '){
          return true;
        }

        if(grid[0][2].marker == grid[1][1].marker && grid[1][1].marker == grid[2][0].marker && grid[0][2].marker != ' '){
          return true;
        }

        return false;
      },
      disableBoard:function(){
        for(var i = 0 ; i < 3; i++){
          for(var x = 0; x < 3; x++){
            this.grid[i][x].disabled = true;
          }
        }
      }
    };
});