const Discord = require("discord.js")


module.exports = {

    embed: (message,Title, Description, fields) => {
        const Embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(Title ?? "No Title")
        .setDescription(Description ?? "No Description")
        try{
            Embed.setThumbnail(message.author.avatarURL())
        } catch{
            
        }
        for(i in fields){
             Embed.addField(fields[i][0] ?? "-", fields[i][1]?? "-", fields[i][2] ?? false) // Main Text, Text Below, Inline or not
        }
        
        Embed.setTimestamp()
        Embed.setFooter('Bot Crafters', 'https://i.imgur.com/o0jyleP.png');
        
        
        return Embed
    }


}