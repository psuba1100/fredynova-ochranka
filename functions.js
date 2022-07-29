const { MessageEmbed } = require('discord.js');
const warns = require('./models/warns')
const antispam = require('./models/antispam')

async function spamCheck(msg, set, time) {
    // go through every user in the set Object
    for (let u of set) {
        
        // if a user was found, continue
        if (u.id === msg.author.id) {
            if (u.times >= 4) {

                try {

                    const data = await warns.findOne({ user: msg.author.id})

                    if(data.spam == 0){

                        msg.reply({embeds:[
                            new MessageEmbed()
                            .setColor('#fc1303')
                            .setTitle('bitte nicht so schnell!')
                            .setDescription(`Vyzerá to na spam a ten je na tomto servery zakázaný! Porušenie tohto pravidla povedie k warnu!`)
                            .setTimestamp()
                            .setAuthor({ name: msg.author.tag, iconURL: msg.author.displayAvatarURL() })
                        ]})

                        data.spam = 1
                        await data.save()

                        u.time = Date.now()
                        u.times = 0

                        return
                    }
                    else{
                        // reset set Object
                        u.time = Date.now
                        u.times = 0

                        data.spam = 0
                        await data.save()

                        try{

                            const adata = await antispam.findOne({idd: '1'})
                            msg.member.timeout(adata.timeoutTime || 0)

                            data.warns++
                            data.save()

    
                            await msg.reply({embeds:[
                                new MessageEmbed()
                                    .setColor('#ffb300')
                                    .setTitle('Udelený warn')
                                    .setDescription(`Používateľ ${msg.author.tag} spamoval. Používateľovi bol udelení warn!`)
                                    .setTimestamp()
                                    .setAuthor({ name: msg.author.tag, iconURL: msg.author.displayAvatarURL()})
                            ]})
                            return
                        }catch(e){
                            data.warns++
                            data.save()
                           

                            await msg.reply({embeds:[
                                new MessageEmbed()
                                    .setColor('#ffb300')
                                    .setTitle('Udelený warn')
                                    .setDescription(`Používateľ ${msg.author.tag} spamoval. Používateľovi bol udelení warn!`)
                                    .setTimestamp()
                                    .setAuthor({ name: msg.author.tag, iconURL: msg.author.displayAvatarURL()})
                            ]})
                            return
                        }
                    }

                } catch (e) {
                    // reset set Object
                    u.time = Date.now
                    u.times = 0
                    
                    let uwu = await warns.create({
                        user: msg.author.id,
                        warns: 0,
                        spam: 1
                    })
                    await uwu.save()

                    msg.reply({embeds:[
                        new MessageEmbed()
                        .setColor('#fc1303')
                        .setTitle('bitte nicht so schnell!')
                        .setDescription(`Vyzerá to na spam a ten je na tomto servery zakázaný! Porušenie tohto pravidla povedie k warnu!`)
                        .setTimestamp()
                        .setAuthor({ name: msg.author.tag, iconURL: msg.author.displayAvatarURL() })
                    ]})
                    
                }
                
 
            } else if ((Date.now() - u.time) <= time) {
                u.times++
                u.time = Date.now()
            } else {
                // if u.time is above 'time' parameter, reset it
                u.time = Date.now()
                u.times = 1
            }
        }
    }

    let userInSet = false
    set.forEach(u => { 
        if (u.id === msg.author.id) userInSet = true 
    })
    
    // 'times' is set to 1 instead of 0 because the member already has sent 1 message
    if (!userInSet) set.add({ id: msg.author.id, time: Date.now(), times: 1 })
}

// export this file so we can require it in another file, in this case bot.js
module.exports = { spamCheck }