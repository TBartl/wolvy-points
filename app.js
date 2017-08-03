var SlackBot = require('slackbots');
var path = require('path');
var fs = require('fs');

var http = require("http");
setInterval(function() {
    http.get("http://<your app name>.herokuapp.com");
}, 300000); // 

var commands = {};
var commandsPath = __dirname + "/commands/";
var commandFiles = fs.readdirSync(commandsPath);
for (var i in commandFiles) {
    var fileName = commandFiles[i];
    var name = fileName.substr(0, fileName.indexOf('.'));
    commands[name.toLowerCase()] = require(commandsPath + fileName);
}

// console.log(commands);
// create a bot https://my.slack.com/services/new/bot
var bot = new SlackBot({
    token: 'xoxb-212739730822-eiCvMQicpX4MbFIzdF35nPyH',
    // name: 'El Wolvyo Pointso'
    name: 'ウルヴァリンポイント'
    // name: 'sʇuᴉoԀ ʎʌloM'
    // name: 'Hanna Kawoosa'
    // name: 'Sheshanth Ramakrishnan'
});

var params = {
    icon_emoji: ':wolvy:'

    // Hanna
    // icon_url: 'https://ca.slack-edge.com/T2PHQRXPU-U2PMDBSDB-1bdf0476856a-48'

    // Shesanth
    // icon_url: 'https://ca.slack-edge.com/T2PHQRXPU-U2ZKZ0ULC-32b82d8974e6-48'
};

var saveData = JSON.parse(fs.readFileSync(path.join(__dirname + "/data.json")));

bot.on('start', function () {
    var message = "";
    if (message != "")
        bot.postMessageToGroup("officer-meme", message, params);
});

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
            runCommand(userName, groupName, data.text);
        }, defaultErrorHandler);
    }, defaultErrorHandler);
});

function runCommand(userName, groupName, text) {
    var words = text.split(" ");
    var commmandTag = words[1].toLowerCase();
    if (commands[commmandTag]) {
        var d = {
            "userName": userName,
            "groupName": groupName,
            "bot": bot,
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
            "runCommand": runCommand
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


var http = require("http");
setInterval(function() {
    http.get("http://radiant-sea-14907.herokuapp.com");
}, 300000); // every 5 minutes

// function choiceMysteryBox(userName, channel) {
//     bot.postMessageToGroup(channel, userName + " has purchased a mystery box! The mystery box is: \"Tough Choice Mystery Box\". Let's see what's inside!\n1)Either gain 50 WP, or give everyone 10 WP (90 WP total).\n2) Admin: Your account has been granted wolvy-points admin rights, but don't abuse it or you'll lose it!\n3) Early Access Pass: You have been invited to #test-channel, the testing grounds for wolvy-points!\n...and remember kids, you too could earn some awesome prizes by purchasing a Mystery Box for only 40 WP!", {
//         icon_emoji: ':rainbow_wolvy:'
//     });
//     // wolvy-points printAndDistribute tbartl -2 acerio -2 shesanth 16 sleepingbooty -2 hkawoosa -2 branden -2 cyan -2 seskanda -2 dbraunst -2
// }

// function theRomanticMysteryBox(userName, channel) {
//     bot.postMessageToGroup(channel, userName + " has purchased a mystery box! The mystery box is: \"The Romantic Mystery Box\". Let's see what's inside!\n1) *Romance*: All users of the opposite gender will recieve 10 WP, courtesy of you!\n2) *Gifter*: Once per day, you can gift another user 2 WP by typing \"wolvy-points gift <username>\"\n3) *It's All Love Baby*: Users using the \"rob\" command can now only take 1 WP per day.\n4) *Early Access Pass*: You have been invited to #test-channel, the testing grounds for wolvy-points!\n...and remember kids, you too could earn some awesome prizes by purchasing a Mystery Box for only 40 WP!", {
//         icon_emoji: ':rainbow_wolvy:'
//     });
//     // wolvy-points printAndDistribute sleepingbooty 10 hkawoosa 10 cyan 10 seskanda 10
// }

// function robinHoodMysteryBox(userName, channel) {
//     bot.postMessageToGroup(channel, userName + " has purchased a mystery box! The mystery box is: \"Robinhood Mystery Box\". Let's see what's inside!\n1) *Equalizer*: All users will move 5 WP closer to 50 WP!\n2) *Robber*: Once per day, you can steal 1 WP by typing \"wolvy-points rob <username>\"\n3) *Gifter*: Once per day, you can gift another user 1 WP by typing \"wolvy-points gift <username>\"\n4) *Early Access Pass*: You have been invited to #test-channel, the testing grounds for wolvy-points!\n...and remember kids, you too could earn some awesome prizes by purchasing a Mystery Box for only 40 WP!", {
//         icon_emoji: ':rainbow_wolvy:'
//     });
//     // wolvy-points printAndDistribute sleepingbooty 10 hkawoosa 10 cyan 10 seskanda 10
// }

// The Choice - Gain 50 WP For yourself, or give 10 WP to everyone (90 WP total).

// Dove - Dove emoji and gift command

// Robinhood - Steal and Gift



// function noMysteryBox(userName, channel) {
//     bot.postMessageToGroup(channel, userName + " has purchased a mystery box! The mystery box is: \"Null Mystery Box\". Let's see what's inside!\n1) Nothing: There are no new rewards available\n2) Instant-Rebate: You will recieve your 40 WP back soon...\n...and remember kids, you too could earn some awesome prizes by purchasing a Mystery Box for only 40 WP!", {
//         icon_emoji: ':rainbow_wolvy:'
//     });
// }

// Unity, Desktop, Phone, Web, Game, Controller, SinglePlayer, MultiPlayer, Networked