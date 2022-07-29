const { SlashCommandBuilder } = require('@discordjs/builders'); 
const antispam = require('../models/antispam')
const { MessageEmbed } = require('discord.js');

module.exports = { 
	data: new SlashCommandBuilder() 
		.setName('antispam')
		.setDescription('Nastav antispam systém')
        .addSubcommand(subcommand =>
            subcommand.setName('settings')
            .setDescription('Nastavenia antispamu')
        .addNumberOption(option =>
            option.setName('time')
                .setDescription('Maximálny čas na napísanie 5 správ (ms)')
            .setRequired(true))
        .addNumberOption(option =>
            option.setName('timeout')
            .setDescription('Doba timeoutu (ms)')
            .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('info')
            .setDescription('Informácie o tom, ako je nastavený antispam')),
        
	async execute(interaction) {
        if(interaction.options.getSubcommand() == 'settings'){
            if(interaction.member.permissions.has("ADMINISTRATOR") == true){
                if(interaction.options.getNumber('time') >= 1000 && interaction.options.getNumber('timeout') >= 0){
                    let data
                    const embed = new MessageEmbed()
                        .setColor('#35fc03')
                        .setTitle('BOOOM')
                        .setDescription(`Čas time (${interaction.options.getNumber('time')}) a čas timeout (${interaction.options.getNumber('timeout')}) boli úspešne nastavené`)
                        .setTimestamp()
                        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })

                    try {
                        data = await antispam.findOne({idd: '1'})
                        data.timeoutTime = interaction.options.getNumber('timeout')
                        data.checkTime = interaction.options.getNumber('time')
                        data.save()
                        await interaction.reply({embeds: [embed]})
                    } catch (e) {
                        data = await antispam.create({
                            idd: '1',
                            timeoutTime: interaction.options.getNumber('timeout'),
                            checkTime: interaction.options.getNumber('time')
                        })
                        data.save()
                        await interaction.reply({embeds: [embed]})
                    }

                }else{
                    await interaction.reply({embeds:[
                        new MessageEmbed()
                        .setColor('#fc1303')
                        .setTitle('Chyba')
                        .setDescription(`Časy ktoré si nastavil/nastavila/nastavilo/nastavili sú príliš nízke!\n\nLimity:\nTime: >= 1000\nTimeout: >=0`)
                        .setTimestamp()
                        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                    ]})
                }

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
        }else{
            let data1
            try{
                data1 = await antispam.findOne({idd:'1'})
            }catch(e){}
            if(data1 == null){
                data1 = {
                    timeoutTime: 0,
                    checkTime: 5000
                }
            }
            await interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor('#035afc')
                        .setTitle('Nastavenia antispamu')
                        .setDescription(`Timeout: ${data1.timeoutTime}\nTime: ${data1.checkTime}`)
                        .setTimestamp()
                        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                ]})
        }
		
	},
};