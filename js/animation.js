/**
 * @author Daniel Sebastian Iliescu, http://dansil.net
 * @license MIT License (MIT), http://opensource.org/licenses/MIT
 */

class Animation
{
    constructor()
    {
        this.__animation = null;
        this.__initial = Date.now();
    }

    initialize()
    {
        this.inanimate();

        this.__initial = Date.now();
    }

    /**
     * Animates the action.
     * The action is expected to be a function.
     */
    animate( action )
    {
        this.__request( action );
    }

    /**
     * Inanimates the action effectively bringing the game to a halt.
     */
    inanimate()
    {
        window.cancelAnimationFrame( this.__animation );
    }

    /**
     * Runs the actual action through the animation.
     */
    __loop( action )
    {
        this.__request( action );

        // TODO: Remove frame limiter and make animation independent of physics.
        const framesPerSecond = 20;
        const interval = 1000 / framesPerSecond;
        const now = Date.now();
        const delta = now - this.__initial;

        if ( delta > interval )
        {
            this.__initial = now - ( delta % interval );

            action();
        }
    }

    /**
     * Creates a request to animate the action.
     */
    __request( action )
    {
        this.__animation = window.requestAnimationFrame( this.__loop.bind( this, action ) );
    }
}