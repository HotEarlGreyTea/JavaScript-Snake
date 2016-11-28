/**
 * Daniel Sebastian Iliescu, http://dansil.net
 * MIT License (MIT), http://opensource.org/licenses/MIT
 */

class Tiles
{
	constructor()
	{
		this.__tiles = [];
	}

	/**
	 * Initializes the tiles.
	 */
	initialize()
	{
		this.__tiles = [];
	}

	/**
	 * Pushes a new tile into the collection of tiles.
	 */
	push( coordinate, color )
	{
		this.__tiles.push( new Tile( coordinate, color ) );
	}

	/**
	 * Draws the whole collection of tiles on the board.
	 */
	draw()
	{
		for ( const tile of this.__tiles )
		{
			tile.draw();
		}
	}

	/**
	 * Slices the internal array and returns a new one
	 * as a collection of tiles.
	 */
	slice( begin, end )
	{
		const partialTiles = new Tiles();
		partialTiles.tiles = this.__tiles.slice( begin, end );

		return partialTiles;
	}

	/**
	 * Performs leftwards rotation on the tiles.
	 */
	rotate( times )
	{
		while( times-- )
		{
			this.__tiles.push( this.__tiles.shift() );
		}
	}

	/**
	 * Checks for positional equality of the whole collection with another tile.
	 */
	contains( tile )
	{
		return this.__tiles.some( currentTile => currentTile.collides( tile ) );
	}

	/**
	 * Returns the front of the collection.
	 */
	get front()
	{
		return this.__tiles[0];
	}

	/**
	 * Returns the back of the collection.
	 */
	get back()
	{
		return this.__tiles[this.length - 1];
	}

	/**
	 * Returns the length of the collection.
	 */
	get length()
	{
		return this.__tiles.length;
	}

	/**
	 * Sets the internal array of the collection.
	 */
	set tiles( values )
	{
		this.__tiles = values;
	}
}