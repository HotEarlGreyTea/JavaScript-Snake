/**
 * Daniel Sebastian Iliescu, http://dansil.net
 * MIT License (MIT), http://opensource.org/licenses/MIT
 */

class Snake extends Tiles
{
	constructor()
	{
		super();

		this.growthIncrement = 5;
		this.pendingGrowth = 0;
		this.color = "#CE0018";
	}

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
	 * Checks both border collisions as well as self ones and returns true if there were none.
	 */
	move( direction, boardWidth, boardHeight )
	{
		var LEFT = 37;
		var UP = 38;
		var RIGHT = 39;
		var DOWN = 40;

		var left = this.back.left;
		var top = this.back.top;

		switch(direction)
		{
			case LEFT:
				if (left == 0)
				{
					return false;
				} else
				{
					left -= Tile.size();
				}
				break;
			case UP:
				if (top == 0)
				{
					return false;
				} else
				{
					top -= Tile.size();
				}
				break;
			case RIGHT:
				if (left == boardWidth - Tile.size())
				{
					return false;
				} else
				{
					left += Tile.size();
				}
				break;
			case DOWN:
				if (top == boardHeight - Tile.size())
				{
					return false;
				}
				else
				{
					top += Tile.size();
				}
				break;
		}

		if (this.pendingGrowth > 0)
		{
			this.grow( left, top )
		}
		else
		{
			this.moveBody( left, top );
		}

		return !this.collides( this.back );
	}

	collides( tile )
	{
		return this.slice( 0, this.length - 1 ).contains( tile );
	}

	eats( food )
	{
		if ( this.back.collides( food ) )
		{
			this.pendingGrowth += this.growthIncrement;
		}
	}

	grow( left, top )
	{
		this.push( left, top, this.color );
		--this.pendingGrowth;
	}

	moveBody( left, top )
	{
		this.front.color = Board.Color();
		this.front.draw();
		this.front.color = this.color;

		this.rotate( 1 );

		this.back.left = left;
		this.back.top = top;
	}

	kill()
	{
		this.back.color = "GREY";
		this.back.draw();
	}
}