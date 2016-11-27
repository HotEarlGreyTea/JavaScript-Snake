/**
 * Daniel Sebastian Iliescu, http://dansil.net
 * MIT License (MIT), http://opensource.org/licenses/MIT
 */
 
class Animation
{
	constructor( framesPerSecond = 0 )
	{
		this.__animation = null;
		this.__initial = Date.now();

		this.__constrained = ( framesPerSecond > 0 );
		
		const millisecondsPerSecond = 1000;
		this.__millisecondsPerFrame = this.__constrained ? ( millisecondsPerSecond / framesPerSecond ) : 0;
	}

	/**
	 * Initializes the animation to a stopped state.
	 */
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
	 * Inanimates the action effectively bringing the game to a stop.
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

		if ( this.__constrained )
		{
			this.__constrainedLoop( action );
		}
		else
		{
			this.__uncontrainedLoop( action );
		}
	}

	/**
	 * Loop logic with a frame limiter.
	 */
	__constrainedLoop( action )
	{
		const now = Date.now();
		const delta = now - this.__initial;

		if ( delta > this.__millisecondsPerFrame )
		{
			this.__initial = now - ( delta % this.__millisecondsPerFrame );

			this.__uncontrainedLoop( action );
		}
	}

	/**
	 * Loop logic without a frame limiter.
	 */
	__uncontrainedLoop( action )
	{
		action();
	}

	/**
	 * Creates a request to animate the action.
	 */
	__request( action )
	{
		this.__animation = window.requestAnimationFrame( this.__loop.bind( this, action ) );
	}
}