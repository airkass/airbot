//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
// AirKass#0472            ▬
// https://airkass.fr      ▬
//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
                                                                                   
                                                                                   

const Discord = require("discord.js");
const client = new Discord.Client();

// ⇉ CONFIGURATION
const token = process.env.TOKEN; // → TOKEN DU BOT
var prefix = "/"; // → PREFIX DU BOT
var cbienvenue = "684822672156131351"; // → ID DU SALON DE BIENVENUE
var pcolor = "#FFFFFF"; // → COULEUR PRIMAIRE (embed...)
var scolor = "#00B212"; // → COULEUR PRINCIPALEMENT VERT POUR TOUS LES SUCCES !
var ccolor = "#E24343"; // → COULEUR PRINCIPALEMNT ROUGE POUR TOUS LES "CANCEL" !
var ProfilGame = "sur Thinkercad"; // → Le bot joue à ......
var ProfilStream = "https://twitch.tv/airkass"; // → Le bot stream du ......

// ⇉ CONNECTION

client.on("ready", () => {;
var memberCount = client.users.size;
var servercount = client.guilds.size;
	var servers = client.guilds.array().map(g => g.name).join(',');
    console.log("===============CONNECTION=============");
    console.log("");
    console.log(`[!] Le bot ${client.user.tag} est prêt.`);
    console.log("");
    console.log(`[!] Invitation : https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`);
    console.log("");
    console.log("============CONFIGURATION=============");
    console.log("");
    console.log("[!] Couleur primaire : " + pcolor);
    console.log("");
    console.log("[!] Couleur Succes : " + scolor);
    console.log("");
    console.log("[!] Couleur Cancel : " + ccolor);
    console.log("");
    console.log("[!] Token : " + token);
    console.log("");
    console.log("[!] Salon de bienvenue : " + cbienvenue);
    console.log("");
    console.log("[!] Préfix : " + prefix);
    console.log("");
    console.log("[!] Le bot joue à : " + ProfilGame);
    console.log("");
    console.log("[!] Le bot stream : " + ProfilStream);
    console.log("");
    console.log("================STATS=================");
    console.log("");
    console.log("[!] Nombre de serveurs : " + servercount);
    console.log("");
    console.log("[!] Nombre d'utilisateur : " + memberCount);
    console.log("");
    console.log(`[!] Il est actuellement sur les serveurs suivants : ${client.guilds.map(c=>c.name).join(', ')}`);
    console.log("");
    console.log("======================================");
client.user.setStatus('Online')
client.user.setGame(ProfilGame, ProfilStream);
});

// ⇉ STATS CHANNEL

var serverStats = {
    guildID: '684478044681011247',
    memberCountID: "685385714904465409",
}

client.on('guildMemberAdd', member => {
    if (member.guild.id !== serverStats.guildID) return;

    client.channels.get(serverStats.memberCountID).setName(`▪ 𝗨𝗧𝗜𝗟𝗜𝗦𝗔𝗧𝗘𝗨𝗥𝗦 : ${member.guild.members.filter(m => !m.bot).size}`);

});

client.on('guildMemberRemove', member => {
    if (member.guild.id !== serverStats.guildID) return;
    client.channels.get(serverStats.memberCountID).setName(`▪ 𝗨𝗧𝗜𝗟𝗜𝗦𝗔𝗧𝗘𝗨𝗥𝗦 : ${member.guild.members.filter(m => !m.bot).size}`);
    
});


// ⇉ MESSAGE DE BIENVENUE / MESSAGE PRIVE
client.on('guildMemberAdd', member => {
    console.log("[+] " + member.user.username + " viens d'arriver sur le discord");
    var wel_embed = new Discord.RichEmbed()
     .setColor(pcolor)
     .setAuthor("Bienvenue sur le discord " + member.user.username + " " , member.user.avatarURL)
     .setThumbnail("https://airkass.fr/assets/logo.gif")
     .setTimestamp()
     .setFooter("Discord bot by AirKass#0472 - https://airkass.fr")
    member.createDM().then(channel => {
        return channel.send(wel_embed);  
    }).catch(console.error)

// ⇉ AUTO ROLE

    let role = member.guild.roles.find("name", "🍹・Khey")
    member.addRole(role)

// ⇉ NOUVEAU MEMBRE SALON BIENVENUE
    var cwel_embed = new Discord.RichEmbed()
    .setColor(scolor)
    .setAuthor(member.user.username + " viens de rejoindre le discord !", member.user.avatarURL)
    .setTimestamp()
    .setFooter("Nouveau membre")
    member.guild.channels.get(cbienvenue).send(cwel_embed);
});

// ⇉ MEMBRE PARTI SALON BIENVENUE
client.on('guildMemberRemove', member => {
    console.log("[-] " + member.user.username + " viens de partir du discord !");
    var cbye_embed = new Discord.RichEmbed()
    .setColor(ccolor)
    .setAuthor(member.user.username + " est parti du discord !", member.user.avatarURL)
    .setTimestamp()
    .setFooter("Membre parti")
    member.guild.channels.get(cbienvenue).send(cbye_embed);

});
// ⇉ MUTE / UNMUTE
client.on("message", (message) => {
    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRAROR")) return message.channel.send(":x: Vous n'avez pas la permission :x:");

        if(message.mentions.users.size === 0 ){
            return message.channel.send(":x: Vous devez mentioner un utilisateur ! :x:");
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send(":x: Je n'ai pas trouver l'utilisateur ou il n'existe pas :x:");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send(":x: Je n'ai pas la permission :x:");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} est mute dans ce salon !`);

        })
    }
    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRAROR")) return message.channel.send(":x: Vous n'avez pas la permission :x:");

        if(message.mentions.users.size === 0 ){
            return message.channel.send(":x: Vous devez mentioner un utilisateur ! :x:");
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send(":x: Je n'ai pas trouver l'utilisateur ou il n'existe pas :x:");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send(":x: Je n'ai pas la permission :x:");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} n'est plus mute dans ce salon!`);

        })
    }

});

// ⇉ MOT DE PASSE

var mdp = "air03"

client.on("message", (message) => {
    if (message.channel.id === "536960546520432640") {
        if (message.content !== mdp) {
            var embed = new Discord.RichEmbed()
                .setColor(ccolor)
                .addField(":x: Le mot de passe est incorrecte, veuillez réessayer :x:", "‏")
                .setTimestamp()
                .setFooter("ERREUR")
            message.author.createDM().then(channel => {
                return channel.send(embed);  
                }).catch(console.error)
        }
    }
    if (message.channel.id === "536960546520432640") {
        if (message.content !== "") {
            message.delete();
        }
    }
    if (message.channel.id === "536960546520432640") {  
        if (message.content === mdp) {
            var mdpembed = new Discord.RichEmbed()
                .setColor(scolor)
                .addField(":white_check_mark: Le mot de passe a été validé :white_check_mark: ", "‏")
                .setTimestamp()
                .setFooter("VALIDE")
            message.author.createDM().then(channel => {
                return channel.send(mdpembed);  
                }).catch(console.error)
            message.member.removeRole(message.guild.roles.find('name', '❌ Non confirmé'));
            message.member.addRole(message.guild.roles.find('name', '☁️ Membre'));


        }
    }
})

// ⇉ STATS USER 

client.on('message', message => {
    if(message.content.startsWith(prefix + "mystats")) {
        var embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
             .setColor(pcolor)
             .setThumbnail(message.author.avatarURL)
             .addField("Vous avez rejoint le: ", message.member.joinedAt)
        message.channel.send(embed);
        
    }
})

client.on("message", (message) => {
    if(message.content.startsWith(prefix + "stats")) {

        if(message.mentions.users.size === 0 ){
            return message.channel.send(":x: Vous devez mentioner un utilisateur ! :x:");
        }

        var statsuser = message.guild.member(message.mentions.users.first());

        if(!statsuser) {
            return message.channel.send(":x: Je n'ai pas trouver l'utilisateur ou il n'existe pas :x:");
        }
        
        var embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor(pcolor)
        .setThumbnail(`https://airkass.fr/assets/logo.gif`)
        .addField(`${statsuser.user.username} a rejoint le:  `, statsuser.joinedAt)
        message.channel.send(embed);

    }

})

// ⇉ RANDOM (BONJOUR,SALUT..)
client.on('message', message => {

    if(message.content.toLowerCase().includes('bonjour')){
        random();

        if (randnum == 0){
            message.reply("Hey, je suis un bot !");
        }

        if (randnum == 1){
            message.reply("Hey ça roule ?");
        }

        if (randnum == 2){
            message.reply("Yoo");
        }

        if (randnum == 3){
            message.reply("Hey");
        }


    }
    if(message.content.toLowerCase().includes('salut')){
        random2();

        if (randnum == 0){
            message.reply("Hey, je suis un bot !");
        }

        if (randnum == 1){
            message.reply("Hey ça roule ?");
        }

        if (randnum == 2){
            message.reply("Yoo");
        }

        if (randnum == 3){
            message.reply("Hey");
        }

    }

});

function random2(min, max) {
    min = Math.ceil(0);
    max = Math.floor(4);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}
function random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(4);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}

// ⇉ ANTI INSULTE, PUB...

client.on('message', message => {
    var i_embed = new Discord.RichEmbed()
    .setColor(ccolor)
    .addField(":warning: **Ton langage " + message.author.username + "** :warning:", "‏")

    var l_embed = new Discord.RichEmbed()
    .setColor(ccolor)
    .addField(":warning: **Pas de lien " + message.author.username + "** :warning:", "‏")


    var pub_embed = new Discord.RichEmbed()
    .setColor(ccolor)
    .addField(":warning: **Pas de pub " + message.author.username + "** :warning:", "‏")

    var link_embed = new Discord.RichEmbed()
    .setColor(ccolor)
    .addField(":warning: **Pas de lien ici " + message.author.username + "** :warning:", "‏")

//ANTI LIENS SALON
    if (message.channel.id === "485060836927340549") {
        if(message.content.toLowerCase().includes('https://')){
            message.delete(message.author);
            message.channel.send(link_embed)
            .then(message => {
                message.delete(5000)
              })
              .catch
        }
    }
    
// ANTI INSULTES
    if(message.content.toLowerCase().includes('pute batard fils de pute merde enculé ntm')){
        message.delete(message.author);
        message.channel.send(i_embed)
        .then(message => {
            message.delete(5000)
          })
          .catch
    }

    if(message.content.toLowerCase().includes('https://discord.gg/')){
        message.delete(message.author);
        message.channel.send(pub_embed)
        .then(message => {
            message.delete(5000)
          })
          .catch
    }

    if(message.content.toLowerCase().includes('https://discord.me/')){
        message.delete(message.author);
        message.channel.send(pub_embed)
        .then(message => {
            message.delete(5000)
          })
          .catch
    }

    if(message.content.toLowerCase().includes('https://discord.io/')){
        message.delete(message.author);
        message.channel.send(pub_embed)
        .then(message => {
            message.delete(5000)
          })
          .catch
    }

});


// ⇉ PURGE COMMANDE
client.on('message', message => {

    let msg = message.content.toUpperCase();
    let sender = message.author;
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);

    if (msg.startsWith(prefix + 'PURGE')) {
        async function purge() {
            message.delete();

            if (!message.member.roles.find("name", "superadmin")) { 
                message.channel.send(":x: Tu n'as pas la permission d'executer cette commande :x:");
                return;
                 
            }

            if (isNaN(args[0])) {
                message.channel.send(':x: Veuillez utiliser un nombre comme argument. :x: \n\nUtilisation: `/purge <nombre>`'); 
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]}); 

            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`:x: Erreur: ${error} :x:`));

        }

        purge();

    }
});



var embedcmd = new Discord.RichEmbed()
.setColor(pcolor)
.setTitle(":nut_and_bolt: COMMANDE ROLES")
.addField("‏", "‏")
.addField("`/pc` → 🖥️・ PC", "‏")
.addField("`/ps4` → 🎮・ PS4", "‏")
.addField("`/xbox` → 💚・XBOX", "‏")
.addField("‏", "‏")

client.on("message", (message) => {
    if (message.content === prefix + "cmd"){
        message.channel.send(embedcmd)

    }
})

client.on("message", (message) => {
    if (message.content === prefix + "cmd"){
        message.reply(":x: COMMANDE INVALIDE :x:")
        .then(message => {
            message.delete(10000)
          })
          .catch
    }
})

// ⇉ COMMANDE ROLES (PC,XBOX..)
client.on("message", (message) => {
    if (message.channel.id === "685402848644562984") {
        if (message.content !== ""){
            message.delete();
        }
    }
    if (message.content === "/pc"){
        message.delete(message.author);
        if (message.member.roles.find("name", "🖥️・ PC")) { 
        message.member.removeRole(message.guild.roles.find('name', '🖥️・ PC'));
        var embeddel = new Discord.RichEmbed()
         .setColor(ccolor)
         .setAuthor(message.author.username, message.author.avatarURL)
         .addField("Vous avez été retiré du role `🖥️・ PC`", "‏‏‏")
         .setTimestamp()
         message.author.createDM().then(channel => {
            return channel.send(embeddel);  
            }).catch(console.error)
        }else{
      message.member.addRoles(message.guild.roles.find('name', '🖥️・ PC'))
          .then(console.log)
          .catch(console.error);
        var embedadd = new Discord.RichEmbed()
          .setColor(scolor)
          .setAuthor(message.author.username, message.author.avatarURL)
          .addField("Vous avez été ajouté au rôle `🖥️・ PC`", "‏‏‏")
          .setTimestamp()
             message.author.createDM().then(channel => {
                return channel.send(embedadd);  
                }).catch(console.error)
        }
    }
    if (message.content === "/ps4"){
        message.delete(message.author);
        if (message.member.roles.find("name", "🎮・ PS4")) { 
        message.member.removeRole(message.guild.roles.find('name', '🎮・ PS4'));
        var embeddel = new Discord.RichEmbed()
         .setColor(ccolor)
         .setAuthor(message.author.username, message.author.avatarURL)
         .addField("Vous avez été retiré du role `🎮・ PS4`", "‏‏‏")
         .setTimestamp()
         message.author.createDM().then(channel => {
            return channel.send(embeddel);  
            }).catch(console.error)
        }else{
      message.member.addRoles(message.guild.roles.find('name', '🎮・ PS4'))
          .then(console.log)
          .catch(console.error);
        var embedadd = new Discord.RichEmbed()
          .setColor(scolor)
          .setAuthor(message.author.username, message.author.avatarURL)
          .addField("Vous avez été ajouté au rôle `🎮・ PS4`", "‏‏‏")
          .setTimestamp()
             message.author.createDM().then(channel => {
                return channel.send(embedadd);  
                }).catch(console.error)
        }
    }
    if (message.content === "/xbox"){
        message.delete(message.author);
        if (message.member.roles.find("name", "💚・XBOX")) { 
        message.member.removeRole(message.guild.roles.find('name', '💚・XBOX'));
        var embeddel = new Discord.RichEmbed()
         .setColor(ccolor)
         .setAuthor(message.author.username, message.author.avatarURL)
         .addField("Vous avez été retiré du role `💚・XBOX`", "‏‏‏")
         .setTimestamp()
         message.author.createDM().then(channel => {
            return channel.send(embeddel);  
            }).catch(console.error)
        }else{
      message.member.addRoles(message.guild.roles.find('name', '💚・XBOX'))
          .then(console.log)
          .catch(console.error);
        var embedadd = new Discord.RichEmbed()
          .setColor(scolor)
          .setAuthor(message.author.username, message.author.avatarURL)
          .addField("Vous avez été ajouté au rôle `💚・XBOX`", "‏‏‏")
          .setTimestamp()
             message.author.createDM().then(channel => {
                return channel.send(embedadd);  
                }).catch(console.error)
        }
    
    
}

});

client.login(token)
  
