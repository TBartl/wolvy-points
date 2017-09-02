module.exports.run = function (data) {
    var user = data.saveData.users[data.userName];
    if (!user || !user.isImpersonator) {
        data.postMessage("You can't use this command!");
        return;
    }

    if (data.words.length <= 3) {
        data.postMessage("Not enough arguments provided!");
        return;
    }

    var name = data.words[2];

    var message = "";
    var words = data.words.slice(3);
    words.forEach(function (word) {
        message += word + " ";
    }, this);

    // params = {
    //     "data": data.token,
    //     "channel": data.messageData.channel,
    //     "ts": data.messageData.ts,
    //     "as_user": true
    // };

    // data.bot._api('chat.update', params).then(
    //     function (goodData) {
    //         console.log(goodData);
    //     },
    //     function (errData) {
    //         console.log(("Err"));
    //         console.log(errData);
    //     });

    data.bot.getUser(name).then(function (getUserData) {
        var messageBot = new data.SlackBot({
            "token": data.token,
            "name": getUserData.real_name
        });
        messageBot.on('start', function () {
            messageBot.postMessageToGroup(data.groupName, message, {
                "icon_url": getUserData.profile.image_48
            });
        });
    }, function () {
        data.postMessage("Could not find user: " + name)
    });
}

module.exports.help = `"wp impersonate <targetUser> <words...>". 
Outputs a message as if that user typed it.`;

module.exports.restriction = "Impersonator";

/*
S Tier
 - Terraria

A Tier
 - Crypt of the NecroDancer
 - Ori and the Blind Forest
 - Undertale
 - Dishonored

Blizzard Tier
 - Warcraft 3
 - Starcraft 2
 - World of Warcraft (Formerly Good) 

Nostalgia Tier
 - Custom Robo (GameCube)
 - Super Smash Bros Melee
 - Minecraft
 - Portal

Shooter Tier
 - Halo 3
 - Red Faction: Guerilla
 - TF2
 - Left 4 Dead
 - Titanfall
 - Time Splitters: Future Perfect

SuperGiant Tier
 - Pyre
 - Bastion
 - Transistor (Eh)

MOBA Tier
 - League of Legends
 - Adventure Time Battle Party

Roguelike Tier
 - Spelunky

*/
