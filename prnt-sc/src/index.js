import { webpackModules } from "@cumcord/modules"

let unpatch

const random = () =>
{
	return Math.random().toString( 16 ).substring( 2, 8 )
}

export default {
	onLoad ()
	{
		unpatch = cumcord.patcher.after( "sendMessage", webpackModules.findByProps( "sendMessage" ), ( args ) =>
		{
			if ( args[ 1 ].content.startsWith( "!prnt" ) )
			{
				const nextTest = args[ 1 ].content.replace( "!prnt", "" ).replace( " ", "" )
				const nextTestInt = parseInt( nextTest )
				if ( nextTestInt <= 5 )
				{
					let message = ""
					for ( let i = 0; i < nextTestInt; i++ )
					{
						const link = "https://prnt.sc/" + random()
						message += link + "\n"
					}
					args[ 1 ].content = message
				} else
				{
					const message = "https://prnt.sc/" + random()
					args[ 1 ].content = message
				}
			}
			return args
		}
		)
	},
	onUnload ()
	{
		unpatch()
	},
}
