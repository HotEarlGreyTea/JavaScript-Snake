/**
 * Daniel Sebastian Iliescu, http://dansil.net
 * MIT License (MIT), http://opensource.org/licenses/MIT
 */

class Tile
{
	constructor( left, top, color )
	{
		this.left = left;
		this.top = top;
		this.color = color;
		this.size = Tile.size();
	}

	/**
	 * Draws the tile on the board.
	 */
	draw()
	{
		Canvas.Context.fillStyle = this.color;

		const offset = 1;
		Canvas.Context.fillRect(
			this.left + offset,
			this.top + offset,
			this.size - offset,
			this.size - offset );
	}

	/**
	 * Checks for positional equality with another tile.
	 */
	collides( tile )
	{
		return ( this.left == tile.left ) && ( this.top == tile.top );
	}

	/**
	 * Size of the tiles on the board. This value is inversely
	 * proportional to the amount of tiles on the board.
	 */
	static size()
	{
		return 20;
	}
}