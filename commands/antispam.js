const { SlashCommandBuilder } = require('@discordjs/builders'); 

module.exports = { 
	data: new SlashCommandBuilder() 
		.setName('antispam')
		.setDescription('Nastav antispam systém')
        .addNumberOption(option =>
            option.setName('time')
            .setDescription('Maximálny čas na napísanie 5 správ')
            .setRequired(true))
        .addNumberOption(option =>
            option.setName('timeout')
            .setDescription('Doba timeoutu. Číslo udávajte v milisekundách.')
            .setRequired(true)),
	async execute(interaction) {
        try {
            await interaction.reply('Pong!'); 
        } catch (error) {
            console.log(error)
        }
		
	},
};