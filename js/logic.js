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

		// TODO: Remove frame limiter and make animation independent of physics.
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
	update( currentDirection, width, height )
	{
		const moved = this.__snake.move( currentDirection, width, height );

		if ( moved )
		{
			this.__snake.eats( this.__food );

			while( this.__snake.contains( this.__food ) )
			{
				this.__food.generate();
			}

			this.__food.draw();
			this.__snake.draw();
		}
		else
		{
			this.stop();
		}

		return moved;
	}

	/**
	 * Gets the game score which is determined by the snake's length.
	 */
	get score()
	{
		return this.__snake.length;
	}
}