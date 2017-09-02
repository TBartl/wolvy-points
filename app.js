var SlackBot = require('slackbots');
var path = require('path');
var fs = require('fs');

// git push heroku master
// heroku ps:scale web=1

var commands = {};
var commandsPath = __dirname + "/commands/";
var commandFiles = fs.readdirSync(commandsPath);
for (var i in commandFiles) {
    var fileName = commandFiles[i];
    var name = fileName.substr(0, fileName.indexOf('.'));
    commands[name.toLowerCase()] = require(commandsPath + fileName);
}

var token = "";

var tokenFilePath = __dirname + "/token.txt";
if (fs.existsSync(tokenFilePath))
    token = fs.readFileSync(tokenFilePath, "utf8");
else if (process.env.SLACK_TOKEN)
    token = process.env.SLACK_TOKEN;

// create a bot https://my.slack.com/services/new/bot

var botParams = {
    "token": token,
    // name: 'El Wolvyo Pointso'
    "name": 'ウルヴァリンポイント'
    // name: 'sʇuᴉoԀ ʎʌloM'
}

var bot = new SlackBot(botParams);

var params = {
    icon_emoji: ':wolvy:'
};

var saveData = JSON.parse(fs.readFileSync(path.join(__dirname + "/data.json")));

bot.on('start', function () {
    var message = "";
    // message = "Hey kids, it's time for another fun Wolvy Fact! Did you know wolverines can climb trees?. While wolverines sleep, hunt and give birth on the ground, the can also climb trees just like some bears. They can do this because of their long, sharp hook-like claws, which they also use to climb sheer cliffs, icefalls and snowy peaks.";
    // message = "Hey kids, it's time for another fun Wolvy Fact! Did you know wolverines can climb trees?. While wolverines sleep, hunt and give birth on the ground, the can also climb trees just like some bears. They can do this because of their long, sharp hook-like claws, which they also use to climb sheer cliffs, icefalls and snowy peaks.";
    // message = "Hey kids, it's time for another fun Wolvy Fact! Did you know that like the skunk, the wolverine has a strong-smelling fluid called musk which the wolverine uses to warn others to stay away..";
    // message = "Hey kids, it's time for another fun Wolvy Fact! Did you know that unlike most members of the weasel family, wolverines have a particularly heavy set of fur that allows that to survive in the coldest storms. Speaking of storms, you should all check out Heroes of the Storm; An exciting new game featuring all of your favorite Blizzard characters from Warcraft, Starcraft, Diablo, and Overwatch. As a bonus promotion, if you play now you'll have access to the Nexus 2.0 challenge where you can unlock awesome loot that crossovers into your other favorite Blizzard App Games. So grab your friend, sign up at www.heroesofthestorm.com and we'll see you, in the nexus. "    
    // message = "Hey kids, it's time for another fun Wolvy Fact! Did you know that like some Wolverine Soft members, real wolverines are awfully smelly? One Native American tribe calls wolverines \"skunk bear.\" The stench comes from special anal glands that allow the animals to emit an offensive odor that protects their food and marks their territory (they'll also use it when threatened, raising their tails like skunks). The fragrant odor has traces of methylbutanoic acid (think smelly cheese), methyldecanoic acid, and phenylacetic acid, and has a composition similar to that of smaller members of the weasel family, pine and beech martens.";
    // message = "Hey kids, it's time for another fun Wolvy Fact! Did you know that despite its large size, the wolverine has a number of predators? The mountain lion, wolf, and bear are predators of the wolverine. However, the human is recognized as the primary predator of the wolverine.";
    // message = "Hey kids, it's time for another fun Wolvy Fact! Did you know that wolverineaccess.com is a fucking garbage piece of shit like seriously whatever subhuman decided that this pile of shit is good enough should be exterminated on the spot. If I ever get a request to donate to the school I'm going to send them back a message saying \"You should have fixed this broken piece of crap\" because the school obviously doesn't care about us students (and also because I'm never giving my hard earned cash to those money-grubbing animals).";
    // message = "Hey kids, it's time for another fun Wolvy Fact! Did you know .";

    // message = "You think this is some sort of democracy?.";
    // params = {
    //     icon_emoji: ":angrthomas:"
    // }
    // message = "For a limited time, the next mystery box will cost just 0 WP!";
    if (message != "")
        bot.postMessageToGroup("officer-meme", message, params);

    if (isReadyForStart()) {
        bot.postMessageToGroup("officer-meme", "Hey kids, Wolvy Points is now online!", params);
    }
});

function isReadyForStart() {
    var currentDate = new Date();
    var currentDay = currentDate.getDay();
    if (saveData.nextAnnounceOnline == undefined || saveData.nextAnnounceOnline != currentDay) {
        saveData.nextAnnounceOnline = currentDay;
        save();
        return true;
    }
    return false;
}

bot.on('message', function (data) {

    // console.log(data);

    if (data.type != "message")
        return;

    var words = data.text.split(" ");
    if (words.length <= 1)
        return;

    if (!caseInsensitiveComp(words[0], "wolvy-points") && !caseInsensitiveComp(words[0], "wolvy-point") && !caseInsensitiveComp(words[0], "wp"))
        return;

    if (!data.user || !data.channel)
        return;

    bot.getUserById(data.user).then(function (getUserByIdData) {
        bot.getGroupById(data.channel).then(function (getGroupByIdData) {
            var userName = getUserByIdData.name;
            var groupName = getGroupByIdData.name;
            runCommand(userName, groupName, data.text, data);
        }, defaultErrorHandler);
    }, defaultErrorHandler);
});

function runCommand(userName, groupName, text, messageData = 0) {
    var words = text.split(" ");
    var commmandTag = words[1].toLowerCase();
    if (commands[commmandTag]) {
        var d = {
            "userName": userName,
            "groupName": groupName,
            "bot": bot,
            "SlackBot": SlackBot,
            "saveData": saveData,
            "params": params,
            "commands": commands,
            "words": words,
            "message": text,
            "postMessage": function (message) {
                // console.log(message);
                if (saveData.users[userName] && saveData.users[userName].isPremium)
                    bot.postMessageToGroup(groupName, message, {
                        icon_emoji: ':rainbow_wolvy:'
                    });
                else
                    bot.postMessageToGroup(groupName, message, params);
            },
            "setSaveData": function (newSaveData) {
                saveData = newSaveData;
            },
            "runCommand": runCommand,
            "token": token,
            "messageData": messageData
        }
        commands[commmandTag].run(d);
    } else {
        bot.postMessageToGroup(groupName, "Error: No command \"" + words[1] + "\" exists.", params);
    }
    save();
}

function caseInsensitiveComp(a, b) {
    return a.toUpperCase() === b.toUpperCase();
}

function save() {
    fs.writeFileSync(path.join(__dirname + "/data.json"), JSON.stringify(saveData));
}

function defaultErrorHandler(err) {
    console.error('\x1b[41m Error:', err, '\x1b[0m');
}

// function noMysteryBox(userName, channel) {
//     bot.postMessageToGroup(channel, userName + " has purchased a mystery box! The mystery box is: \"Null Mystery Box\". Let's see what's inside!\n1) Nothing: There are no new rewards available\n2) Instant-Rebate: You will recieve your 40 WP back soon...\n...and remember kids, you too could earn some awesome prizes by purchasing a Mystery Box for only 40 WP!", {
//         icon_emoji: ':rainbow_wolvy:'
//     });
// }



// Flip Side
// Laser Craft
// Shape Fight
// Sonder
// Sonder Alpha
// Necro Clone

// FlipSide
// Wave Dasher
// Cloud Chaser
// WTLDT
// CyberSpace Doom
// Avalanche Fiesta


// Tumbleweed Dodgeball
// Chrono Cursor
// Metroid (Clone)

// The CCA Project

// Predictus
// The Harmonizer

// Pluggable Test Formats
// ATFCloud.io

// The Blood Book
// tbartl.github.io
// Wolvy Points