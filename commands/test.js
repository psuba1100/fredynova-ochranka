const { SlashCommandBuilder } = require('@discordjs/builders'); 

module.exports = { 
	data: new SlashCommandBuilder() 
		.setName('test')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
        await interaction.reply('d')
        await interaction.deleteReply();
        let a = await interaction.channel.send('test')
        console.log(a)
		module.exports = {a}
        console.log(a)
        a.edit('uwu')
	},
};