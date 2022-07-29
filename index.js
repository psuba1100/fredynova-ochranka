//
//	Imports
//
const { MONGODB_SRV, token } = require('./config.json');
const { MessageEmbed } = require('discord.js');
const bannedWords = require('./models/bannedWords')
const warns = require('./models/warns')
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const mongoose = require('mongoose')
require('dotenv').config()
function wait(ms) {
	return new Promise((resolve) => {
	  setTimeout(resolve, ms);
	});
  }

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

//
//	events
//

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//
//	on ready
//

client.once('ready', () => {
	console.log('Ready!');
    client.user.setActivity('/help')
});



client.on('messageCreate', async message => {
    const data = await bannedWords.findOne({idd: '1'})
    for (var i = 0; i < data.word.length; i++) {
		const m = message.content.toLowerCase()
        if (m.includes(data.word[i])) {
            const pfp = message.author.displayAvatarURL()
    
            const embed = new MessageEmbed()
                .setColor('#ffb300')
                .setTitle('Udelení warn')
                .setDescription(`Používateľ ${message.author.tag} použil zakázané slovo: ||${data.word[i]}||. Pôvodná správa bola odstránená a používateľovy bol udelení warn!`)
                .setTimestamp()
                .setAuthor({ name: message.author.tag, iconURL: pfp})
    
            await message.channel.send({embeds: [embed]})
			await message.delete()
			break
        }
      }
})
let set = new Set()

// fire the message event
client.on('messageCreate', msg => {
    // if the user is a bot then exit
    if (msg.member.user.bot === true) return

    // require the functions file which we will be getting our function from
    const functions = require('./functions')

    // use the function: spamCheck(the message, the object of the Set() class, amount of ms)
    // if you put 1000 ms, then it will wait 1 full second. if there are 5 messages in one second from 1 member, then it will run some code.
    functions.spamCheck(msg, set, 10000)
})

//
//	db
//

mongoose.connect(MONGODB_SRV, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	//userFindAndModify: false
}).then(() => {
	console.log('Connected db')
}).catch((err) => {
	console.log(err)
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);