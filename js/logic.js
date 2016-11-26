/**
 * @author Daniel Sebastian Iliescu, http://dansil.net
 * @license MIT License (MIT), http://opensource.org/licenses/MIT
 */

class Logic
{
    constructor()
    {
        this.__states =
        {
            Start: 0,
            Play: 1,
            End: 2
        }

        this.__state = this.__states.Start;

        this.__animation = new Animation();
        this.__food = new Food();
	    this.__snake = new Snake();
    }

    initialize( horizontalTiles, verticalTiles )
    {
        this.__animation.initialize();
        this.__food.initialize( horizontalTiles, verticalTiles );

        this.start();
    }

    /**
     * Sets the game to an initial starting state.
     */
    start()
    {
        this.__state = this.__states.Start;

        this.__food.generate();
		this.__food.draw();

        this.__snake.generate();
		this.__snake.draw();
    }

    /**
     * Sets the game to a playing state.
     */
    play( action )
    {
        this.__state = this.__states.Play;

        this.__animation.animate( action );
    }

    /**
     * Sets the game to a stopped state.
     */
    stop()
    {
        this.__state = this.__states.End;

        this.__snake.kill();
        this.__animation.inanimate();
    }

    started()
    {
        return ( this.__state === this.__states.Start );
    }

    playing()
    {
        return ( this.__state === this.__states.Play );
    }

    stopped()
    {
        return ( this.__state === this.__states.End );
    }

    /**
     * Updates the game's logic.
     */
    update( currentDirection, width, height )
    {
        const moved = this.__snake.move( currentDirection, width, height );

        if ( moved )
		{
			this.__snake.eats( this.__food );

			while( this.__snake.contains( this.__food ) )
			{
				this.__food.generate();
			}

			this.__food.draw();
			this.__snake.draw();
		}
        else
        {
            this.stop();
        }

        return moved;
    }

    get score()
    {
        return this.__snake.length;
    }
}