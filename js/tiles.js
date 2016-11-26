/**
 * @author Daniel Sebastian Iliescu, http://dansil.net
 * @license MIT License (MIT), http://opensource.org/licenses/MIT
 */

class Tiles
{
    constructor()
    {
        this.__tiles = [];
    }

    initialize()
    {
        this.__tiles = [];
    }

    push( left, top, color )
    {
        this.__tiles.push( new Tile( left, top, color ) );
    }

    draw()
    {
        for ( const tile of this.__tiles )
        {
            tile.draw();
        }
    }

    slice( begin, end )
    {
        const partialTiles = new Tiles();
        partialTiles.tiles = this.__tiles.slice( begin, end );

        return partialTiles;
    }

    rotate( times )
    {
        while( times-- )
        {
            this.__tiles.push( this.__tiles.shift() );
        }
    }

    contains( tile )
    {
        return this.__tiles.some( currentTile => currentTile.collides( tile ) );
    }

    get front()
    {
        return this.__tiles[0];
    }

    get back()
    {
        return this.__tiles[this.length - 1];
    }

    get length()
    {
        return this.__tiles.length;
    }

    set tiles( values )
    {
        this.__tiles = values;
    }
}