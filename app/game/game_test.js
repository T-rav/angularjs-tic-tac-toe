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
      expect(actual.currentPlayer).toBe('X');
    }));
  });
});