/**
 * Daniel Sebastian Iliescu, http://dansil.net
 * MIT License (MIT), http://opensource.org/licenses/MIT
 */

class Food extends Tile
{
	constructor()
	{
		const foodColor = "#FFA200";

		super( 0, 0, foodColor );

		this.__horizontalRange = 0;
		this.__verticalRange = 0;
	}

	initialize( horizontalRange, verticalRange )
	{
		this.__horizontalRange = horizontalRange;
		this.__verticalRange = verticalRange;
	}

	/**
	 * Generates a new coordinate for the food tile.
	 */
	generate()
	{
		this.left = this.__computeNormalizedPosition( this.__horizontalRange );
		this.top = this.__computeNormalizedPosition( this.__verticalRange );
	}

	/**
	 * Returns a coordinate within the specified range.
	 */
	__computeNormalizedPosition( range )
	{
		const position = Math.floor( Math.random() * range );

		return position * this.size;
	}
}