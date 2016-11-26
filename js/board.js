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

	initialize()
	{
		const lateralConstraintRatio = 0.9;
		const width = Math.round( window.innerWidth * lateralConstraintRatio );

		const vericalConstraintRatio = 0.95;
		const height = Math.round(
			window.innerHeight * vericalConstraintRatio 
			- document.getElementsByTagName("header")[0].clientHeight 
			- document.getElementById("game-info").clientHeight	
			- document.getElementsByTagName("footer")[0].clientHeight );

		this.__horizontalTiles = Math.round( width / Tile.size() );
		this.__verticalTiles = Math.round( height / Tile.size() );

		this.__width = this.__horizontalTiles * Tile.size();
		this.__height = this.__verticalTiles * Tile.size();

		const units = "px";
		Canvas.canvas.setAttribute( "width", this.__width + units );
		Canvas.canvas.setAttribute( "height", this.__height + units );

		Canvas.context.fillStyle = Board.Color();
		Canvas.context.fillRect( 0, 0, this.__width, this.__height );
	}

	get horizontalTiles()
	{
		return this.__horizontalTiles;
	}

	get verticalTiles()
	{
		return this.__verticalTiles;
	}

	get width()
	{
		return this.__width;
	}

	get height()
	{
		return this.__height;
	}

	static Color()
	{
		return "#E3E7FF";
	}
}