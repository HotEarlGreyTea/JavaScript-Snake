/**
 * Daniel Sebastian Iliescu, http://dansil.net
 * MIT License (MIT), http://opensource.org/licenses/MIT
 */
 
class Animation
{
	constructor()
	{
		this.__animation = null;
		this.__initial = Date.now();
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

		// TODO: Remove frame limiter and make animation independent of physics.
		const framesPerSecond = 20;
		const millisecondsPerSecond = 1000;
		const millisecondsPerFrame = millisecondsPerSecond / framesPerSecond;
		const now = Date.now();
		const delta = now - this.__initial;

		if ( delta > millisecondsPerFrame )
		{
			this.__initial = now - ( delta % millisecondsPerFrame );

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