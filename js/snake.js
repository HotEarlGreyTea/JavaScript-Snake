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
		this.growthIncrement = 5;

		// Value used to determine the incremental growth left during growth.
		this.pendingGrowth = 0;

		this.color = "#CE0018";
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
			const left = Tile.size() * multiplier;
			const top = Tile.size() * multiplier;
			
			this.push( left, top, this.color );
		}
	}

	/**
	 * Moves the snake in a direction.
	 * Checks both border and inner collisions.
	 */
	move( controls, boardWidth, boardHeight )
	{
		let left = this.back.left;
		let top = this.back.top;

		if ( controls.isLeft )
		{
			if ( left == 0 )
			{
				return false;
			}
			else
			{
				left -= Tile.size();
			}
		}
		else if ( controls.isUp )
		{
			if ( top == 0 )
			{
				return false;
			}
			else
			{
				top -= Tile.size();
			}
		}
		else if ( controls.isRight )
		{
			if ( left == boardWidth - Tile.size() )
			{
				return false;
			}
			else
			{
				left += Tile.size();
			}
		}
		else if ( controls.isDown )
		{
			if ( top == boardHeight - Tile.size() )
			{
				return false;
			}
			else
			{
				top += Tile.size();
			}
		}

		if ( this.pendingGrowth > 0 )
		{
			this.grow( left, top )
		}
		else
		{
			this.moveBody( left, top );
		}

		return !this.collides( this.back );
	}

	/**
	 * Checks the collision of the snake's head with the rest of its body.
	 */
	collides( tile )
	{
		return this.slice( 0, this.length - 1 ).contains( tile );
	}

	/**
	 * Checks the collision of the snake's head with the food tile.
	 * Increment the snake's body on collision.
	 */
	eats( food )
	{
		if ( this.back.collides( food ) )
		{
			this.pendingGrowth += this.growthIncrement;
		}
	}

	/**
	 * Push addition tiles on the snake until its growth is over.
	 */
	grow( left, top )
	{
		this.push( left, top, this.color );
		--this.pendingGrowth;
	}

	/**
	 * Move the body of the snake excluding its head.
	 */
	moveBody( left, top )
	{
		this.front.color = Board.Color();
		this.front.draw();
		this.front.color = this.color;

		this.rotate( 1 );

		this.back.left = left;
		this.back.top = top;
	}

	/**
	 * Kills the snake.
	 */
	kill()
	{
		this.back.color = "GREY";
		this.back.draw();
	}
}