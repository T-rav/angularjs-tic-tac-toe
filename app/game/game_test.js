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

    it('when creating board create 3x3 grid', inject(function($controller, $rootScope) {
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

    it('when creating board should set current player to be "x"', inject(function($controller, $rootScope) {
      //arrange
      var scope = $rootScope.$new();
      $controller('GameController',{'$scope':scope});
      // act
      var actual = scope.board;
      // assert
      var expected = {name:'Player 1',marker:'X'};
      expect(actual.currentPlayer).toEqual(expected);
    }));

    describe('move', function() {

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
        // act
        scope.board.move(cell1)
        scope.board.move(cell1);
        // assert
        var expected = {name:'Player 2',marker:'O'};
        expect(scope.board.currentPlayer).toEqual(expected);
        expect(scope.board.message).toEqual('This space is taken, please choose again.');
      }));

      it('when placing winning move, should set board to win state', inject(function($controller, $rootScope) {
        //arrange
        var scope = $rootScope.$new();
        $controller('GameController',{'$scope':scope});
        var cell1 = scope.board.grid[0][0];
        var cell1a = scope.board.grid[1][0];
        var cell2 = scope.board.grid[0][1];
        var cell2a = scope.board.grid[2][0];
        var cell3 = scope.board.grid[0][2];
        // act
        scope.board.move(cell1)
        scope.board.move(cell1a);
        scope.board.move(cell2);
        scope.board.move(cell2a);
        scope.board.move(cell3);
        // assert
        expect(scope.board.message).toEqual('Player 1 is the winner!');
        expect(scope.board.grid[0][0].disabled).toBeTruthy();
        expect(scope.board.grid[0][1].disabled).toBeTruthy();
        expect(scope.board.grid[0][2].disabled).toBeTruthy();
        expect(scope.board.grid[1][0].disabled).toBeTruthy();
        expect(scope.board.grid[1][1].disabled).toBeTruthy();
        expect(scope.board.grid[1][2].disabled).toBeTruthy();
        expect(scope.board.grid[2][0].disabled).toBeTruthy();
        expect(scope.board.grid[2][1].disabled).toBeTruthy();
        expect(scope.board.grid[2][2].disabled).toBeTruthy();
      }));

      it('when clicking reset after winning, should set board to start state', inject(function($controller, $rootScope) {
        //arrange
        var scope = $rootScope.$new();
        $controller('GameController',{'$scope':scope});
        var cell1 = scope.board.grid[0][0];
        var cell1a = scope.board.grid[1][0];
        var cell2 = scope.board.grid[0][1];
        var cell2a = scope.board.grid[2][0];
        var cell3 = scope.board.grid[0][2];
        // act
        scope.board.move(cell1)
        scope.board.move(cell1a);
        scope.board.move(cell2);
        scope.board.move(cell2a);
        scope.board.move(cell3);
        scope.board.reset();
        // assert
        var expected = {name:'Player 1',marker:'X'};
        expect(scope.board.currentPlayer).toEqual(expected);
        expect(scope.board.grid[0][0].marker).toBe(' ');
        expect(scope.board.grid[0][0].disabled).toBeFalsy();
        expect(scope.board.grid[0][1].marker).toBe(' ');
        expect(scope.board.grid[0][1].disabled).toBeFalsy();
        expect(scope.board.grid[0][2].marker).toBe(' ');
        expect(scope.board.grid[0][2].disabled).toBeFalsy();
        expect(scope.board.grid[1][0].marker).toBe(' ');
        expect(scope.board.grid[1][0].disabled).toBeFalsy();
        expect(scope.board.grid[1][1].marker).toBe(' ');
        expect(scope.board.grid[1][1].disabled).toBeFalsy();
        expect(scope.board.grid[1][2].marker).toBe(' ');
        expect(scope.board.grid[1][2].disabled).toBeFalsy();
        expect(scope.board.grid[2][0].marker).toBe(' ');
        expect(scope.board.grid[2][0].disabled).toBeFalsy();
        expect(scope.board.grid[2][1].marker).toBe(' ');
        expect(scope.board.grid[2][1].disabled).toBeFalsy();
        expect(scope.board.grid[2][2].marker).toBe(' ');
        expect(scope.board.grid[2][2].disabled).toBeFalsy();
      }));
    });

    describe('reset', function() {
      it('when reset clicked should set game to start state', inject(function($controller, $rootScope) {
        //arrange
        var scope = $rootScope.$new();
        $controller('GameController',{'$scope':scope});
        var cell = scope.board.grid[0][0];
        // act
        scope.board.move(cell);
        scope.board.reset();
        // assert
        var expected = {name:'Player 1',marker:'X'};
        expect(scope.board.currentPlayer).toEqual(expected);
        expect(scope.board.grid[0][0].marker).toBe(' ');
        expect(scope.board.grid[0][0].disabled).toBeFalsy();
        expect(scope.board.grid[0][1].marker).toBe(' ');
        expect(scope.board.grid[0][2].marker).toBe(' ');
        expect(scope.board.grid[1][0].marker).toBe(' ');
        expect(scope.board.grid[1][1].marker).toBe(' ');
        expect(scope.board.grid[1][2].marker).toBe(' ');
        expect(scope.board.grid[2][0].marker).toBe(' ');
        expect(scope.board.grid[2][1].marker).toBe(' ');
        expect(scope.board.grid[2][2].marker).toBe(' ');
      }));
    });

    describe('hasWinner', function() {
      [[
        [{marker:'X'},{marker:'X'},{marker:'X'}],
        [{marker:' '},{marker:' '},{marker:' '}],
        [{marker:' '},{marker:' '},{marker:' '}]
      ],
      [
        [{marker:' '},{marker:' '},{marker:' '}],
        [{marker:'X'},{marker:'X'},{marker:'X'}],
        [{marker:' '},{marker:' '},{marker:' '}]
      ],
      [
        [{marker:' '},{marker:' '},{marker:' '}],
        [{marker:' '},{marker:' '},{marker:' '}],
        [{marker:'X'},{marker:'X'},{marker:'X'}]
      ]].forEach(function(grid){
        it('when row based win, should return true', inject(function($controller, $rootScope) {
          //arrange
          var scope = $rootScope.$new();
          $controller('GameController',{'$scope':scope});
          // act
          var actual = scope.board.hasWinner(grid);
          // assert
          expect(actual).toBeTruthy();
        }));  
      });

      [[
        [{marker:'O'},{marker:' '},{marker:' '}],
        [{marker:'O'},{marker:' '},{marker:' '}],
        [{marker:'O'},{marker:' '},{marker:' '}]
      ],
      [
        [{marker:' '},{marker:'O'},{marker:' '}],
        [{marker:' '},{marker:'O'},{marker:' '}],
        [{marker:' '},{marker:'O'},{marker:' '}]
      ],
      [
        [{marker:' '},{marker:' '},{marker:'O'}],
        [{marker:' '},{marker:' '},{marker:'O'}],
        [{marker:' '},{marker:' '},{marker:'O'}]
      ]].forEach(function(grid){
        it('when column based win, should return true', inject(function($controller, $rootScope) {
          //arrange
          var scope = $rootScope.$new();
          $controller('GameController',{'$scope':scope});
          // act
          var actual = scope.board.hasWinner(grid);
          // assert
          expect(actual).toBeTruthy();
        }));  
      });

      [[
        [{marker:'O'},{marker:' '},{marker:' '}],
        [{marker:' '},{marker:'O'},{marker:' '}],
        [{marker:' '},{marker:' '},{marker:'O'}]
      ],
      [
        [{marker:' '},{marker:' '},{marker:'X'}],
        [{marker:' '},{marker:'X'},{marker:' '}],
        [{marker:'X'},{marker:' '},{marker:' '}]
      ]].forEach(function(grid){
        it('when diagonal based win, should return true', inject(function($controller, $rootScope) {
          //arrange
          var scope = $rootScope.$new();
          $controller('GameController',{'$scope':scope});
          // act
          var actual = scope.board.hasWinner(grid);
          // assert
          expect(actual).toBeTruthy();
        }));  
      });
    });
  });
});