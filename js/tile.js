/**
 * @author Daniel Sebastian Iliescu, http://dansil.net
 * @license MIT License (MIT), http://opensource.org/licenses/MIT
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

    draw()
    {
        Canvas.context.fillStyle = this.color;

        const offset = 1;
        Canvas.context.fillRect(
            this.left + offset,
            this.top + offset,
            this.size - offset,
            this.size - offset );
    }

    collides( tile )
    {
        return ( ( this.left == tile.left ) &&
                 ( this.top == tile.top ) );
    }

    static size()
    {
        return 20;
    }
}