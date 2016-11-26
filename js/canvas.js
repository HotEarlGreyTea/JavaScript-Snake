/**
 * @author Daniel Sebastian Iliescu, http://dansil.net
 * @license MIT License (MIT), http://opensource.org/licenses/MIT
 */

class Canvas
{
    static get canvas()
    {
        return document.getElementById( "snake-canvas" );
    }

    static get context()
    {
        return Canvas.canvas.getContext( "2d" );
    }
}