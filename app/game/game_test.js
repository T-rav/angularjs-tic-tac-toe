'use strict';

describe('app.game module', function() {

  beforeEach(module('app.game'));

  describe('game controller', function(){

    it('should create instance', inject(function($controller, $rootScope) {
      //arrange
      var scope = $rootScope.$new();
      //scope.$apply();
      // act
      var gameCtrl = $controller('GameController',{'$scope':scope});
      // assert
      expect(gameCtrl).toBeDefined();
    }));

    it('should create board with 3x3 grid', inject(function($controller, $rootScope) {
      //arrange
      var scope = $rootScope.$new();
      $controller('GameController',{'$scope':scope});
      // act
      var actual = scope.board;
      // assert
      expect(actual.grid.length).toBe(3);
      expect(actual.grid[0].length).toBe(3);
      expect(actual.grid[1].length).toBe(3);
      expect(actual.grid[2].length).toBe(3);
    }));

    it('should set current player to be "x"', inject(function($controller, $rootScope) {
      //arrange
      var scope = $rootScope.$new();
      $controller('GameController',{'$scope':scope});
      // act
      var actual = scope.board;
      // assert
      var expected = {name:'Player 1',marker:'X'};
      expect(actual.currentPlayer).toEqual(expected);
    }));

    it('after player 1 move, should update board state', inject(function($controller, $rootScope) {
      //arrange
      var scope = $rootScope.$new();
      $controller('GameController',{'$scope':scope});
      var cell = scope.board.grid[0][0];
      // act
      scope.board.move(cell);
      // assert
      var expected = {name:'Player 2',marker:'O'};
      expect(scope.board.currentPlayer).toEqual(expected);
      expect(cell.marker).toEqual('X');
    }));

    it('after player 2 move, should update board state', inject(function($controller, $rootScope) {
      //arrange
      var scope = $rootScope.$new();
      $controller('GameController',{'$scope':scope});
      var cell1 = scope.board.grid[0][0];
      var cell2 = scope.board.grid[0][1];
      // act
      scope.board.move(cell1)
      scope.board.move(cell2);
      // assert
      var expected = {name:'Player 1',marker:'X'};
      expect(scope.board.currentPlayer).toEqual(expected);
      expect(cell2.marker).toEqual('O');
    }));

    it('when trying to mark taken space should keep current player turn while displaying error message', inject(function($controller, $rootScope) {
      //arrange
      var scope = $rootScope.$new();
      $controller('GameController',{'$scope':scope});
      var cell1 = scope.board.grid[0][0];
      var cell2 = scope.board.grid[0][1];
      // act
      scope.board.move(cell1)
      scope.board.move(cell1);
      // assert
      var expected = {name:'Player 2',marker:'O'};
      expect(scope.board.currentPlayer).toEqual(expected);
      expect(scope.message).toEqual('This space is taken, please choose again.');
    }));
  });
});