/**
 * Daniel Sebastian Iliescu, http://dansil.net
 * MIT License (MIT), http://opensource.org/licenses/MIT
 */

class Board
{
	constructor()
	{
		this.__horizontalTiles = 0;
		this.__verticalTiles = 0;

		this.__width = 0;
		this.__height = 0;
	}

	/**
	 * Initializes the board to a width and height relative to that of the
	 * client's screen dimensions.
	 */
	initialize()
	{
		const lateralConstraintRatio = 0.9;
		const width = Math.round( window.innerWidth * lateralConstraintRatio );

		const vericalConstraintRatio = 0.95;
		const height = Math.round(
			window.innerHeight * vericalConstraintRatio 
			- document.getElementsByTagName("header")[0].clientHeight 
			- document.getElementById("game-information").clientHeight	
			- document.getElementsByTagName("footer")[0].clientHeight );

		this.__horizontalTiles = Board.ComputeTileCountFromSpan( width );
		this.__verticalTiles = Board.ComputeTileCountFromSpan( height );

		this.__width = Board.ComputeSpanFromTileCount( this.__horizontalTiles );
		this.__height = Board.ComputeSpanFromTileCount( this.__verticalTiles );

		const units = "px";
		Canvas.Element.setAttribute( "width", this.__width + units );
		Canvas.Element.setAttribute( "height", this.__height + units );

		Canvas.Context.fillStyle = Board.Color();
		Canvas.Context.fillRect( 0, 0, this.__width, this.__height );
	}

	/**
	 * Get horizontal tiles in dimensionless units.
	 */
	get horizontalTiles()
	{
		return this.__horizontalTiles;
	}

	/**
	 * Get vertical tiles in dimensionless units.
	 */
	get verticalTiles()
	{
		return this.__verticalTiles;
	}

	/**
	 * Get horizontal tiles in pixels.
	 */
	get width()
	{
		return this.__width;
	}

	/**
	 * Get vertical tiles in pixels.
	 */
	get height()
	{
		return this.__height;
	}

	static ComputeTileCountFromSpan( span )
	{
		return Math.round( span / Tile.size() );
	}

	static ComputeSpanFromTileCount( count )
	{
		return count * Tile.size();
	}

	/**
	 * Board color.
	 */
	static Color()
	{
		return "#E3E7FF";
	}
}