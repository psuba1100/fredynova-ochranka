const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const bannedWords = require('../models/bannedWords')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('words')
        .setDescription('Spravuje zakázané slová')
        .addSubcommand(subcommand =>
            subcommand.setName('ban')
                .setDescription('Zakáž nejaké slovo')
                .addStringOption(option =>
                    option.setName('slovo').setDescription('Aké slovo chceš zakázať?').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('unban')
                .setDescription('Povol nejaké zakázané slovo')
                .addStringOption(option =>
                    option.setName('slovoo').setDescription('Aké slovo chceš povoliť?').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('list')
                .setDescription('Zobraz list zakázaných slov')),
    async execute(interaction) {
        const data = await bannedWords.findOne({ idd: '1' })

        if (interaction.member.permissions.has("ADMINISTRATOR") == true) {

            if (interaction.options.getSubcommand() == 'ban') {


                if (data.word.includes(interaction.options.getString('slovo'))) {

                    await interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor('#fc1303')
                                .setTitle('Chyba')
                                .setDescription(`Vyzerá to tak, že slovo "${interaction.options.getString('slovo')}" už je zakázané`)
                                .setTimestamp()
                                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                        ]
                    })

                }
                else {

                    data.word.push(interaction.options.getString('slovo'))
                    data.save()

                    await interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor('#35fc03')
                                .setTitle('BOOOM')
                                .setDescription(`Slovo "${interaction.options.getString('slovo')}" bolo úspešne pridané do zoznamu zakázanýhc slov`)
                                .setTimestamp()
                                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                        ]
                    })

                }

            } else if (interaction.options.getSubcommand() == 'unban') {

                if (data.word.includes(interaction.options.getString('slovoo'))) {
                    data.word.splice(data.word.indexOf(interaction.options.getString('slovoo'), 1))
                    data.save()
                    await interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor('#35fc03')
                                .setTitle('BOOOM')
                                .setDescription(`Slovo "${interaction.options.getString('slovoo')}" bolo úspešne odstránené zo zoznamu zakázanýhc slov`)
                                .setTimestamp()
                                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                        ]
                    })
                } else {
                    await interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor('#fc1303')
                                .setTitle('Chyba')
                                .setDescription(`Vyzerá to tak, že slovo "${interaction.options.getString('slovoo')}" nie je v zozname zakázaných slov`)
                                .setTimestamp()
                                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                        ]
                    })
                }

            } else if (interaction.options.getSubcommand() == 'list') {



                try {
                    const data1 = await bannedWords.findOne({ idd: '1' })

                    await interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor('#035afc')
                                .setTitle('Zabanované slová')
                                .setDescription(`Toto je list zabanovaných slov: ${data1.word}`)
                                .setTimestamp()
                                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                        ]
                    })
                } catch (e) {
                    await interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor('#fc1303')
                                .setTitle('Chyba')
                                .setDescription(`Vyzerá to tak, že žiadne slová neboli zakázané`)
                                .setTimestamp()
                                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                        ]
                    })
                }
            }

        } else {



            if (interaction.options.getSubcommand() == 'list') {



                try {
                    const data1 = await bannedWords.findOne({ idd: '1' })

                    await interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor('#035afc')
                                .setTitle('Zabanované slová')
                                .setDescription(`Toto je list zabanovaných slov: ${data1.word}`)
                                .setTimestamp()
                                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                        ]
                    })
                } catch (e) {
                    await interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor('#fc1303')
                                .setTitle('Chyba')
                                .setDescription(`Vyzerá to tak, že žiadne slová neboli zakázané`)
                                .setTimestamp()
                                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                        ]
                    })
                }
            }else{
                await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor('#fc1303')
                            .setTitle('Chyba')
                            .setDescription(`Vyzerá to tak, že nemáš oprávnenie používať tento command. Použiť ho môžu len ľudia ktorých rola obsahuje právomoc "administrator"`)
                            .setTimestamp()
                            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                    ]
                })
            }

        }

    },
};