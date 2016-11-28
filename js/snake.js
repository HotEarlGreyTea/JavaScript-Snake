/**
 * Daniel Sebastian Iliescu, http://dansil.net
 * MIT License (MIT), http://opensource.org/licenses/MIT
 */

class Snake extends Tiles
{
	constructor()
	{
		super();

		// Value used to determine by how much the snake will grow.
		this.__growthIncrement = 5;
		// Value used to determine the incremental growth left during growth.
		this.__pendingGrowth = 0;
		this.__color = "#CE0018";
	}

	/**
	 * Generates the snake given its initial length.
	 */
	generate()
	{
		this.initialize();
		
		const initialSnakeLength = 1;

		for ( let idx = 0; idx < initialSnakeLength; idx++ )
		{
			const multiplier = idx + 1;
			const coordinate =
			{
				x: Tile.size() * multiplier,
				y: Tile.size() * multiplier
			};

			this.push( coordinate, this.__color );
		}
	}

	/**
	 * Moves the snake in a direction.
	 * Checks both border and inner collisions.
	 */
	move( coordinate )
	{
		if ( this.__pendingGrowth > 0 )
		{
			this.__grow( coordinate )
		}
		else
		{
			this.__move( coordinate );
		}

		return !this.__collides( this.back );
	}

	/**
	 * Checks the collision of the snake's head with the food tile.
	 * Increment the snake's body on collision.
	 */
	eats( food )
	{
		if ( this.back.collides( food ) )
		{
			this.__pendingGrowth += this.__growthIncrement;
		}
	}

	/**
	 * Kills the snake.
	 */
	kill()
	{
		this.back.color = "GREY";
		this.back.draw();
	}

	/**
	 * Push addition tiles on the snake until its growth is over.
	 */
	__grow( coordinate )
	{
		this.push( coordinate, this.__color );
		--this.__pendingGrowth;
	}

	/**
	 * Move the body of the snake excluding its head.
	 */
	__move( coordinate )
	{
		this.front.color = Board.Color();
		this.front.draw();
		this.front.color = this.__color;

		this.rotate( 1 );

		this.back.coordinate = coordinate;
	}

	/**
	 * Checks the collision of the snake's head with the rest of its body.
	 */
	__collides( tile )
	{
		return this.slice( 0, this.length - 1 ).contains( tile );
	}
}