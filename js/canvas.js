/**
 * Daniel Sebastian Iliescu, http://dansil.net
 * MIT License (MIT), http://opensource.org/licenses/MIT
 */

class Canvas
{
	/**
	 * Gets the canvas element.
	 */
	static get Element()
	{
		return document.getElementById( "snake-canvas" );
	}

	/**
	 * Gets the canvas context.
	 */
	static get Context()
	{
		return Canvas.Element.getContext( "2d" );
	}
}