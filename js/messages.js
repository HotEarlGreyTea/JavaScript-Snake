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

	/**
	 * Initializes the starting game message.
	 */
	initialize( value )
	{
		this.clear();
		this.__createInformationPanel();
		this.update( value );
		this.create( "Press any key to move the snake. Use the arrow keys to change directions." );
	}

	/**
	 * Displays the ending game message.
	 */
	end()
	{
		this.create( "You died! Press any key to restart." );
	}

	/**
	 * Updates the score.
	 */
	update( value )
	{
		this.__score = value;
		this.__updateInformationPanel( this.informationPanel );
	}

	/**
	 * Creates a message.
	 */
	create( message )
	{
		const gameMessage = document.createElement( "div" );

		gameMessage.setAttribute( "class", this.gameMessagesQualifiedName );
		gameMessage.innerHTML = message;

		document.body.appendChild( gameMessage );
	}

	/**
	 * Clear all messages.
	 */
	clear()
	{
		for ( const element of this.gameMessages )
		{
			this.__removeItem( element );
		}
	}

	/**
	 * Gets the information panel.
	 */
	get informationPanel()
	{
		return document.getElementById( this.gameInformationQualifiedName );
	}

	/**
	 * Gets the game message.
	 */
	get gameMessages()
	{
		return document.getElementsByClassName( this.gameMessagesQualifiedName );
	}

	/**
	 * Gets the qualified name for the game messages.
	 */
	get gameMessagesQualifiedName()
	{
		return "game-messages";
	}

	/**
	 * Gets the qualified name for the game information.
	 */
	get gameInformationQualifiedName()
	{
		return "game-information";
	}

	/**
	 * Creates the score panel.
	 */
	__createInformationPanel()
	{
		const gameInfo = document.getElementById( this.gameInformationQualifiedName );
		const lengthInfo = document.createElement( "span" );

		this.__updateInformationPanel( lengthInfo );
		gameInfo.appendChild( lengthInfo );
	}

	/**
	 * Updates the score panel.
	 */
	__updateInformationPanel( panel )
	{
		panel.innerHTML = "Snake length: " + this.__score;
	}

	/**
	 * Removes an element from the DOM.
	 */
	__removeItem( item )
	{
		if ( item )
		{
			item.parentNode.removeChild( item );
		}
	}
}