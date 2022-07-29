const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders'); 
const bannedWords = require('../models/bannedWords')

module.exports = { 
	data: new SlashCommandBuilder() 
		.setName('unbanword')
		.setDescription('Povol nejaké zakázané slovo')
        .addStringOption(option =>
            option.setName('slovo')
            .setDescription('Ktoré slovo chceš od banovať')
            .setRequired(true)),
	async execute(interaction) {
        const w = interaction.options.getString('slovo') || 0

        const error = new MessageEmbed()
        .setColor('#fc1303')
        .setTitle('Chyba')
        .setDescription(`Vyzerá to tak, že nemáš oprávnenie používať tento command. Použiť ho môžu len ľudia ktorých rola obsahuje právomoc "administrator"`)
        .setTimestamp()
        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})

        if(interaction.member.permissions.has("ADMINISTRATOR", true) == true){
            try {
                data = await bannedWords.findOne({idd: '1'})
                var array = data.word

                if(array.includes(w)){
                    pos = array.indexOf(w)
                    array.splice(pos, 1)

                    const d = await bannedWords.findOneAndUpdate({
                        idd: '1'
                    }, {
                        $set: {
                            word: array
                        }
                    }
                    )
                }else{
                    await interaction.reply('owo')
                }
            } catch (error) {
                await interaction.reply('unu')
                console.log(error)
            }
        }
        else await interaction.reply({embeds: [error]})
	},
};