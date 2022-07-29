const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders'); 
const bannedWords = require('../models/bannedWords')
const env = require('../env')

module.exports = { 
	data: new SlashCommandBuilder() 
		.setName('banword')
		.setDescription('Zakáž nejaké slovo')
        .addStringOption(option =>
            option.setName('slovo')
            .setDescription('aké slovo chceš zakázať?')
            .setRequired(true)),
	async execute(interaction) {
        const w = interaction.options.getString('slovo') || 0
        const error = new MessageEmbed()
            .setColor('#fc1303')
            .setTitle('Chyba')
            .setDescription(`Vyzerá to tak, že nemáš oprávnenie používať tento command. Použiť ho môžu len ľudia ktorých rola obsahuje právomoc "administrator"`)
            .setTimestamp()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})

            const error1 = new MessageEmbed()
            .setColor('#fc1303')
            .setTitle('Chyba')
            .setDescription(`Vyzerá to tak, že slovo "${w}" už je zakázané`)
            .setTimestamp()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})

        const success = new MessageEmbed()
            .setColor('#35fc03')
            .setTitle('BOOOM')
            .setDescription(`Slovo "${w}" bolo úspešne pridané do zoznamu zakázanýhc slov`)
            .setTimestamp()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})

        if (interaction.member.permissions.has("ADMINISTRATOR", true) == true){
            try {
                const data = await bannedWords.findOne({idd: '1'})
                const array = data.word
                if(array.includes(w)){
                    await interaction.reply({embeds: [error1]})
                }else{
                    await array.push(w)
                    const d = await bannedWords.findOneAndUpdate({
                        idd: '1'
                    }, {
                        $set: {
                            word: array
                        }
                    }
                    )
                    await interaction.reply({embeds: [success]})
                }
    
            } catch (error) {
                const data = bannedWords.create({
                    idd: '1',
                    word: w
                })
                await interaction.reply({embeds: [success]})
            }
        }
        else{
            interaction.reply({embeds: [error], ephemeral: true})
        }


		
	},
};