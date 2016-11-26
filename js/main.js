/**
 * Daniel Sebastian Iliescu, http://dansil.net
 * MIT License (MIT), http://opensource.org/licenses/MIT
 */

( function()
{
	"use strict";

	const board = new Board();
	const controls = new Controls();
	const logic = new Logic();
	const messages = new Messages();

	window.onload = initialize;
	window.onresize = initialize;
	window.onkeydown = handle;

	/**
	 * Initializes game state.
	 */
	function initialize()
	{
		board.initialize();
		controls.initialize();
		logic.initialize( board.horizontalTiles, board.verticalTiles );
		messages.initialize( logic.score );
	}

	/**
	 * Handles key presses.
	 */
	function handle( event )
	{
		if ( logic.started() )
		{
			controls.handle( event );

			logic.play( update );
			
			messages.clear();
		}
		else if ( logic.playing() )
		{
			controls.handle( event );
		}
		else if ( logic.stopped() )
		{
			initialize();
		}
	}

	/**
	 * Updates game state.
	 */
	function update()
	{
		if ( logic.update( controls.currentDirection, board.width, board.height ) )
		{
			messages.update( logic.score );
		}
		else
		{
			messages.end( "You died! Press any key to restart." );
		}
	}
} )();