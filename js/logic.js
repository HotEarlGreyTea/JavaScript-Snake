/**
 * Daniel Sebastian Iliescu, http://dansil.net
 * MIT License (MIT), http://opensource.org/licenses/MIT
 */

class Logic
{
	constructor()
	{
		this.__states =
		{
			Start: 0,
			Play: 1,
			End: 2
		}

		this.__state = this.__states.Start;

		// This effectively binds the game's physics with the frame rate.
		// This is required because the snake must move a single tile over
		// a chosen timespan.
		//
		// While the physics logic could be separated out using simple velocity-based
		// calculations, the end result would still be the same as a time counter would
		// still be involved. Moreover, the resulting distance can't be arbritary or be
		// in-between tiles. It must represent an integral number divisible by the size
		// of the tile, which will require discarding frames.
		const framesPerSecond = 20;
		this.__animation = new Animation( framesPerSecond );

		this.__food = new Food();
		this.__snake = new Snake();
	}

	/**
	 * Initializes the direction.
	 */
	initialize( horizontalTiles, verticalTiles )
	{
		this.__animation.initialize();
		this.__food.initialize( horizontalTiles, verticalTiles );

		this.start();
	}

	/**
	 * Sets the game to an initial starting state.
	 */
	start()
	{
		this.__state = this.__states.Start;

		this.__food.generate();
		this.__food.draw();

		this.__snake.generate();
		this.__snake.draw();
	}

	/**
	 * Sets the game to a playing state.
	 */
	play( action )
	{
		this.__state = this.__states.Play;

		this.__animation.animate( action );
	}

	/**
	 * Sets the game to a stopped state.
	 */
	stop()
	{
		this.__state = this.__states.End;

		this.__snake.kill();
		this.__animation.inanimate();
	}

	/**
	 * Checks to see if the game is in the start state.
	 */
	started()
	{
		return ( this.__state === this.__states.Start );
	}

	/**
	 * Checks to see if the game is in the playing state.
	 */
	playing()
	{
		return ( this.__state === this.__states.Play );
	}

	/**
	 * Checks to see if the game is in the stopped state.
	 */
	stopped()
	{
		return ( this.__state === this.__states.End );
	}

	/**
	 * Updates the game's logic.
	 */
	update( controls, width, height )
	{
		let coordinate =
		{
			x: this.__snake.back.coordinate.x,
			y: this.__snake.back.coordinate.y
		}

		this.__updatePosition( controls, coordinate );

		const board =
		{
			width: width,
			height: height
		}

		if ( this.__isValidPosition( coordinate, board ) &&
			 this.__snake.move( coordinate ) )
		{
			this.__snake.eats( this.__food );

			while( this.__snake.contains( this.__food ) )
			{
				this.__food.generate();
			}

			this.__drawElements();

			return true;
		}
		
		this.stop();

		return false;
	}

	/**
	 * Gets the game score which is determined by the snake's length.
	 */
	get score()
	{
		return this.__snake.length;
	}

	/**
	 * Draw all the generates elements on the canvas.
	 */
	__drawElements()
	{
		this.__food.draw();
		this.__snake.draw();
	}

	/**
	 * Update the next position for the snake.
	 */
	__updatePosition( controls, coordinate )
	{
		if ( controls.isLeft() )
		{
			coordinate.x -= Tile.size();
		}
		else if ( controls.isUp() )
		{
			coordinate.y -= Tile.size();
		}
		else if ( controls.isRight() )
		{
			coordinate.x += Tile.size();
		}
		else if ( controls.isDown() )
		{
			coordinate.y += Tile.size();
		}
	}

	/**
	 * Computes the next' position for the snake.
	 */
	__isValidPosition( coordinate, board )
	{
		const isWithinLateralBounds = ( coordinate.x >= 0 && coordinate.x <= ( board.width - Tile.size() ) );
		const isWithinVerticalBounds = ( coordinate.y >= 0 && coordinate.y <= ( board.height - Tile.size() ) );

		return isWithinLateralBounds && isWithinVerticalBounds;
	}
}