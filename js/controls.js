/**
 * Daniel Sebastian Iliescu, http://dansil.net
 * MIT License (MIT), http://opensource.org/licenses/MIT
 */

class Controls
{
	constructor()
	{
		this.__directions =
		{
			Left: 37,
			Up: 38,
			Right: 39,
			Down: 40
		}

		this.__lateralDirections = new Set( [this.__directions.Left, this.__directions.Right] );
		this.__verticalDirections = new Set( [this.__directions.Up, this.__directions.Down] );

		this.__currentDirection = null;
	}

	/**
	 * Initializes the direction.
	 */
	initialize()
	{
		this.__currentDirection = null; 
	}

	/**
	 * Sets the current direction while ensuring that the current and input directions
	 * are not mutually exclusive. This is determined by enforcing cardinal orthogonality
	 * of lateral and vertical directions.
	 */
	handle( event )
	{
		const value = event.which;
		
		const isInitialValue = ( this.__currentDirection === null );

		const isLateralStoreAndVerticalInput =
			this.__lateralDirections.has( this.__currentDirection ) &&
			this.__verticalDirections.has( value );

		const isVerticalStoreAndLateralInput =
			this.__verticalDirections.has( this.__currentDirection ) &&
			this.__lateralDirections.has( value );

		if ( isInitialValue ||
			 isLateralStoreAndVerticalInput ||
			 isVerticalStoreAndLateralInput )
		{
			this.__currentDirection = value;
		}
	}

	/**
	 * Gets the current direction of the snake's head.
	 */
	get currentDirection()
	{
		return this.__currentDirection;
	}

	/**
	 * Determines if the current direction is leftwards facing.
	 */
	get isLeft()
	{
		return this.__directions.Left == this.currentDirection;
	}

	/**
	 * Determines if the current direction is upwards facing.
	 */
	get isUp()
	{
		return this.__directions.Up == this.currentDirection;
	}

	/**
	 * Determines if the current direction is rightwards facing.
	 */
	get isRight()
	{
		return this.__directions.Right == this.currentDirection;
	}

	/**
	 * Determines if the current direction is downwards facing.
	 */
	get isDown()
	{
		return this.__directions.Down == this.currentDirection;
	}
}