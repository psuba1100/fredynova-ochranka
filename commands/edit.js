const { SlashCommandBuilder } = require('@discordjs/builders'); 
const test = require('./test')

module.exports = { 
	data: new SlashCommandBuilder() 
		.setName('edit')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
        console.log(test.a)
        test.a.edit('edited')
		
	},
};