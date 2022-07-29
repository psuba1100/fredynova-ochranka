const { SlashCommandBuilder } = require('@discordjs/builders'); 
const bannedWords = require('../models/bannedWords')
const { MessageEmbed } = require('discord.js');

module.exports = { 
	data: new SlashCommandBuilder() 
		.setName('bannedwords')
		.setDescription('Zisti aké sú zabanované slová'),
	async execute(interaction) {

        const error = new MessageEmbed()
        .setColor('#fc1303')
        .setTitle('Chyba')
        .setDescription(`Vyzerá to tak, že žiadne slová neboli zakázané`)
        .setTimestamp()
        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
        
        try {
            const data = await bannedWords.findOne({idd: '1'})

            const success = new MessageEmbed()
            .setColor('#035afc')
            .setTitle('Zabanované slová')
            .setDescription(`Toto je list zabanovaných slov: ${data.word}`)
            .setTimestamp()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})

            await interaction.reply({embeds: [success]})
        } catch (error) {
            await interaction.reply({embeds: [error]})
        }
		
	},
};