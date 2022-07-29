const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = { 
	data: new SlashCommandBuilder() 
	.setName('info')
	.setDescription('Get info about a user or a server!')
	.addSubcommand(subcommand =>
		subcommand
			.setName('user')
			.setDescription('Info about a user')
			.addUserOption(option => option.setName('target').setDescription('The user')))
	.addSubcommand(subcommand =>
		subcommand
			.setName('server')
			.setDescription('Info about the server')
			.addUserOption(option => option.setName('targett').setDescription('The user'))),
	async execute(interaction) {
        try {
            await interaction.reply('Pong!'); 
        } catch (error) {
            console.log(error)
        }
		
	},
};