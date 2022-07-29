const { SlashCommandBuilder } = require('@discordjs/builders'); 

module.exports = { 
	data: new SlashCommandBuilder() 
		.setName('antispam')
		.setDescription('Nastav antispam systém')
        .addSubcommand(subcommand =>
            subcommand.setName('settings')
            .setDescription('Nastavenia antispamu')
        .addNumberOption(option =>
            option.setName('time')
            .setDescription('Maximálny čas na napísanie 5 správ')
            .setRequired(true))
        .addNumberOption(option =>
            option.setName('timeout')
            .setDescription('Doba timeoutu. Číslo udávajte v milisekundách.')
            .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('info')
            .setDescription('Informácie o tom, ako je nastavený antispam')),
        
	async execute(interaction) {
        if(interaction.options.getSubcommand() == 'settings'){
            if(interaction.member.permissions.has("ADMINISTRATOR") == true){

            }
            else{
                await interaction.reply({embeds:[
                    new MessageEmbed()
                    .setColor('#fc1303')
                    .setTitle('Chyba')
                    .setDescription(`Vyzerá to tak, že nemáš oprávnenie používať tento command. Použiť ho môžu len ľudia ktorých rola obsahuje právomoc "administrator"`)
                    .setTimestamp()
                    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                ]})
            }
        }
		
	},
};