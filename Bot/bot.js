const fs = require('fs');
const Discord = require('discord.js');
const { Prefix, Token } = require('./botconfig.json');

console.log("Bot Online!")
const firebase= require("../firebase/firebaseconnect")
const ToxicityFilter = require("./enableToxicityFilter")
// Firebase save data

// firebase.savedata(ref,data)

// Firebase get data

// firebase.getdata(ref)

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('Bot/commands').filter(file => file.endsWith('.js'));



for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log("Started listening")
})

client.on('message', message => {
	
	const check = async function(){
		await ToxicityFilter.CheckToxicity(message.content, message)
			
	}
	 check()
	if (!message.content.startsWith(Prefix) || message.author.bot) return;


	const args = message.content.slice(Prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	
	client.commands.map(cmd => {
		if(command == cmd.name){
			cmd.execute(message, args);
		}
	})

	if(command == "commands"){
		const embed = new Discord.MessageEmbed()

		embed.setTitle("Commands")
		embed.setDescription("A list of all the commands")

		client.commands.map(cmd => {
			embed.addField(cmd.name, cmd.description)
		})

		message.channel.send(embed)
	}
})

client.login(Token)