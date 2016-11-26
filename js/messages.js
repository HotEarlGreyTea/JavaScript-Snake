/**
 * Daniel Sebastian Iliescu, http://dansil.net
 * MIT License (MIT), http://opensource.org/licenses/MIT
 */

class Messages
{
	constructor()
	{
		this.__score = 0;
	}

	initialize( value )
	{
		this.clear();
		this.createGameInfo();

		this.update( value );

		this.show( "Press any key to move the snake. Use the arrow keys to change directions." );
	}

	update( value )
	{
		this.__score = value;
		this.updateGameInfo();
	}

	/**
	 * Creates a game message.
	 */
	create( message )
	{
		var gameMessage = document.createElement("div");

		gameMessage.setAttribute("id", "game-message");
		gameMessage.innerHTML = message;

		document.body.appendChild(gameMessage);
	}

	end()
	{
		this.show("You died! Press any key to restart.");
	}

	show( message )
	{
		this.create( message );
	}

	clear()
	{
		while ( document.getElementById("game-message") )
		{
			document.getElementById("game-message").parentNode.removeChild(document.getElementById("game-message"));
		}
	}

	/**
	 * Creates the game information panel.
	 */
	createGameInfo()
	{
		var gameInfo = document.getElementById("game-info");
		var snakeLengthInfo = document.createElement("span");

		gameInfo.innerHTML = "";
		snakeLengthInfo.innerHTML = "Snake length: " + this.__score;

		gameInfo.appendChild(snakeLengthInfo);
	}

	/**
	 * Updates the game information panel.
	 */
	updateGameInfo()
	{
		var gameInfo = document.getElementById("game-info");

		gameInfo.innerHTML = "Snake length: " + this.__score;
	}
}