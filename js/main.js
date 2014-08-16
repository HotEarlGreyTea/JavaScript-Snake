/**
 * JavaScript Snake Game, main.js
 *
 * @version 1.0.6
 * @license MIT License (MIT), http://opensource.org/licenses/MIT
 * @author Daniel Sebastian Iliescu, http://dansil.net
 * @created 2013-09-01
 * @updated 2014-01-04
 */

(function() {
	"use strict";

	/**
	 * Game state properties
	 */
	var TILE_SIZE = 20;
	var INITIAL_SNAKE_LENGTH = 1;
	var SNAKE_INCREMENT = 5;
	var REFRESH_RATE = 75;

	/**
	 * Item colors
	 */
	var CANVAS_BACKGROUND_COLOR = "#E3E7FF";
	var SNAKE_COLOR = "#CE0018";
	var FOOD_COLOR = "#FFA200";
	var HIT_COLOR = "GREY";

	/**
	 * Key Binds
	 */
	var KEY_LEFT = 37;
	var KEY_UP = 38;
	var KEY_RIGHT = 39;
	var KEY_DOWN = 40;

	/**
	 * Directions
	 */
	var LEFT = 0;
	var UP = 1;
	var RIGHT = 2;
	var DOWN = 3;

	var currentDirection; // Current direction of the snake's head
	var keyActive; // Boolean used as a keyboard stopper (for when the user presses multiple keys quicker than the game can update)

	var pendingGrowth; // A counter for the snake's growth

	/**
	 * The computed width and height of the canvas.
	 */
	var boardWidth;
	var boardHeight;

	/**
	 * The amount of tiles that can fit in the canvas, both horizontally and vertically.
	 */
	var horizontalTiles;
	var verticalTiles;

	var endGame; // Boolean representing the end game state

	/**
	 * Blank, food and snake tiles object.
	 */
	var blank;
	var food;
	var snake = [];

	var gameInterval;

	window.onload = init;
	window.onresize = init;
	window.onkeydown = function(event) {
		event.preventDefault();
		var keyPressed = event.which;
		var direction = currentDirection;

		switch(keyPressed) {
			case KEY_LEFT:
				if (!gameInterval || (currentDirection == UP) || (currentDirection == DOWN)) {
					direction = LEFT;
				}
				break;
			case KEY_UP:
				if (!gameInterval || (currentDirection == LEFT) || (currentDirection == RIGHT)) {
					direction = UP;
				}
				break;
			case KEY_RIGHT:
				if (!gameInterval || (currentDirection == UP) || (currentDirection == DOWN)) {
					direction = RIGHT;
				}
				break;
			case KEY_DOWN:
				if (!gameInterval || (currentDirection == LEFT) || (currentDirection == RIGHT)) {
					direction = DOWN;
				}
				break;
		}

		if (direction != currentDirection) {
			if (!keyActive) {
				currentDirection = direction;
				keyActive = true;
			}
		}

		if (endGame) {
			init();
		} else if (!gameInterval) {
			var gameMessage = document.getElementById("game-message");

			gameInterval = setInterval(update, REFRESH_RATE);

			gameMessage.parentNode.removeChild(gameMessage);
		}
	}

	/**
	 * Initializes the game state.
	 */
	function init() {
		var gameMessage = document.getElementById("game-message");
		var snakeCanvas = document.getElementById("snake-canvas");
		var gameContext = snakeCanvas.getContext("2d");
		
		currentDirection = RIGHT;
		keyActive = false;
		endGame = false;

		if (gameMessage) {
			gameMessage.parentNode.removeChild(gameMessage);
		}

		createGameInfo();

		initBoard();
		generateSnake();
		generateFood();
		drawSnake();
		drawFood();
		blank = new Tile(CANVAS_BACKGROUND_COLOR, 0, 0);

		updateGameInfo();

		if (gameInterval) {
			clearInterval(gameInterval);
			gameInterval = null;
		}

		createGameMessage("Press any key to move the snake. Use the arrow keys to change directions.");
	}

	/**
	 * Initializes the game canvas (board).
	 */
	function initBoard() {
		var snakeCanvas = document.getElementById("snake-canvas");
		var gameContext = snakeCanvas.getContext("2d");

		boardWidth = Math.round(window.innerWidth * 0.9);
		boardHeight = Math.round(
			window.innerHeight * 0.95 
			- document.getElementsByTagName("header")[0].clientHeight 
			- document.getElementById("game-info").clientHeight	
			- document.getElementsByTagName("footer")[0].clientHeight);

		horizontalTiles = Math.round(boardWidth / TILE_SIZE);
		verticalTiles = Math.round(boardHeight / TILE_SIZE);

		boardWidth = TILE_SIZE * horizontalTiles;
		boardHeight = TILE_SIZE * verticalTiles;

		if (boardWidth < TILE_SIZE * 8) {
			boardWidth = TILE_SIZE * 8;
		}
		if (boardHeight < TILE_SIZE * 8) {
			boardHeight = TILE_SIZE * 8;
		}

		snakeCanvas.setAttribute("width", boardWidth + "px");
		snakeCanvas.setAttribute("height", boardHeight + "px");

		gameContext.fillStyle = CANVAS_BACKGROUND_COLOR;
		gameContext.fillRect(0, 0, boardWidth, boardHeight);
	}

	/**
	 * Updates the game state.
	 */
	function update() {
		var left = snake[0].left;
		var top = snake[0].top;
		var success = canMoveSnake(currentDirection);

		updateGameInfo();

		if (success) {
			drawBlank(left, top);
			checkFood();
			drawFood();
			drawSnake();
		} else {
			clearInterval(gameInterval);
			gameInterval = null;

			endGame = true;

			snake[snake.length - 1].color = HIT_COLOR;
			snake[snake.length - 1].drawTile();

			createGameMessage("You died! Press any key to restart.");
		}

		keyActive = false;
	}

	/**
	 * Tile object constructor (used for the blank, snake and food tiles).
	 */
	function Tile(color, left, top) {
		this.color = color;
		this.left = left;
		this.top = top;
	}

	/**
	 * Draws a tile for the respective object.
	 */
	Tile.prototype.drawTile = function() {
		var snakeCanvas = document.getElementById("snake-canvas");
		var gameContext = snakeCanvas.getContext("2d");

		gameContext.fillStyle = this.color;
		gameContext.fillRect(this.left + 1, this.top + 1, TILE_SIZE - 1, TILE_SIZE - 1);
	};

	/**
	 * Creates a game message.
	 */
	function createGameMessage(message) {
		var gameMessage = document.createElement("div");

		gameMessage.setAttribute("id", "game-message");
		gameMessage.innerHTML = message;

		document.body.appendChild(gameMessage);
	}

	/**
	 * Creates the game information panel.
	 */
	function createGameInfo() {
		var gameInfo = document.getElementById("game-info");
		var snakeLengthInfo = document.createElement("span");

		gameInfo.innerHTML = "";
		snakeLengthInfo.innerHTML = "Snake length: " + snake.length;

		gameInfo.appendChild(snakeLengthInfo);
	}

	/**
	 * Updates the game information panel.
	 */
	function updateGameInfo() {
		var gameInfo = document.getElementById("game-info");

		gameInfo.innerHTML = "Snake length: " + snake.length;
	}

	/**
	 * Generates the snake object.
	 */
	function generateSnake() {
		var left = TILE_SIZE;
		var top = TILE_SIZE;

		snake = [];

		for (var i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
			snake[i] = new Tile(SNAKE_COLOR, left, top);
			left += TILE_SIZE;
		}

		pendingGrowth = 0;
	}

	/**
	 * Loops over the snake object and draws the tile on the canvas.
	 */
	function drawSnake() {
		for (var i = 0; i < snake.length; i++) {
			snake[i].drawTile();
		}
	}

	/**
	 * Moves the snake in a direction.
	 * Checks both border collisions as well as self ones and returns true if there were none.
	 */
	function canMoveSnake(direction) {
		var left = snake[snake.length - 1].left;
		var top = snake[snake.length - 1].top;

		switch(direction) {
			case LEFT:
				if (left == 0) {
					return false;
				} else {
					left -= TILE_SIZE;
				}
				break;
			case UP:
				if (top == 0) {
					return false;
				} else {
					top -= TILE_SIZE;
				}
				break;
			case RIGHT:
				if (left == boardWidth - TILE_SIZE) {
					return false;
				} else {
					left += TILE_SIZE;
				}
				break;
			case DOWN:
				if (top == boardHeight - TILE_SIZE) {
					return false;
				} else {
					top += TILE_SIZE;
				}
				break;
		}

		if (pendingGrowth > 0) {
			snake[snake.length] = new Tile(SNAKE_COLOR, left, top);
			pendingGrowth--;
		} else {
			for (var i = 0; i < snake.length - 1; i++) {
				snake[i].left = snake[i + 1].left;
				snake[i].top = snake[i + 1].top;
			}

			snake[snake.length - 1].left = left;
			snake[snake.length - 1].top = top;
		}

		return checkSnakeInnerCollision();
	}

	/**
	 * Checks for self-collisions on the snake.
	 * Embedded in the canMoveSnake function.
	 */
	function checkSnakeInnerCollision() {
		var left = snake[snake.length - 1].left;
		var top = snake[snake.length - 1].top;

		for (var i = 0; i < snake.length - 1; i++) {
			if ((left == snake[i].left) && (top == snake[i].top)) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Generates the food object.
	 */
	function generateFood() {
		food = null;

		while(!food) {
			var leftIndex = Math.round(Math.random() * horizontalTiles);
			var topIndex = Math.round(Math.random() * verticalTiles);
			var left;
			var top;

			if (leftIndex == horizontalTiles) {
				leftIndex = horizontalTiles - 1;
			}
			if (topIndex == verticalTiles) {
				topIndex = verticalTiles - 1;
			}

			left = leftIndex * TILE_SIZE;
			top = topIndex * TILE_SIZE;

			food = new Tile(FOOD_COLOR, left, top);

			for (var i = 0; i < snake.length; i++) {
				if (left == snake[i].left && top == snake[i].top) {
					food = null;
					break;
				}
			}
		}
	}

	/**
	 * Draws the food tile on the canvas.
	 */
	function drawFood() {
		food.drawTile();
	}

	/**
	 * Checks if the snake has reached the food.
	 */
	function checkFood() {
		if ((snake[snake.length - 1].left == food.left) && (snake[snake.length - 1].top == food.top)) {
			pendingGrowth += SNAKE_INCREMENT;
			generateFood();
		}
	}

	/**
	 * Draws a blank tile to clear the snake's tail.
	 */
	function drawBlank(left, top) {
		blank.left = left;
		blank.top = top;
		blank.drawTile();
	}
})();