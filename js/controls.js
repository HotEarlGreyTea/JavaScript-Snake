/**
 * @author Daniel Sebastian Iliescu, http://dansil.net
 * @license MIT License (MIT), http://opensource.org/licenses/MIT
 */

class Controls
{
    constructor()
    {
        const directions =
        {
            Left: 37,
            Up: 38,
            Right: 39,
            Down: 40
        }

        this.__lateralDirections = new Set( [directions.Left, directions.Right] );
        this.__verticalDirections = new Set( [directions.Up, directions.Down] );

        // Current direction of the snake's head
        this.__currentDirection = null;
    }

    initialize()
    {
        this.__currentDirection = null; 
    }

    handle( event )
    {
		this.currentDirection = event.which;
    }

    get currentDirection()
    {
        return this.__currentDirection;
    }

    /**
     * Sets the current direction while ensuring that the current direction and the 
     * input direction are not mutually exclusive. This is determined by enforcing
     * cardinal-like rules.
     */
    set currentDirection( value )
    {
        const isInitialValue = ( this.__currentDirection === null );
        const isLateralStoreAndVerticalInput = ( this.__lateralDirections.has( this.__currentDirection ) &&
                                                 this.__verticalDirections.has( value ) );
        const isVerticalStoreAndLateralInput = ( this.__verticalDirections.has( this.__currentDirection ) &&
                                                 this.__lateralDirections.has( value ) );

        if ( isInitialValue ||
             isLateralStoreAndVerticalInput ||
             isVerticalStoreAndLateralInput )
        {
            this.__currentDirection = value;
        }
    }
}