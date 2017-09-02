var SlackBot = require('slackbots');
var fs = require('fs');

var token = "";

var tokenFilePath = __dirname + "/token.txt";
if (fs.existsSync(tokenFilePath))
    token = fs.readFileSync(tokenFilePath, "utf8");

var name = process.argv[2];
var args = process.argv.slice(3);
var message = "";
args.forEach(function (arg) {
    message += arg + " ";
}, this);

console.log("Name: " + name);
console.log("Message: " + message);

var lookupBot = new SlackBot({
    "token": token,
    "name": 'Temp'
});
lookupBot.on('start', function () {
    lookupBot.getUser(name).then(function (getUserData) {
        var messageBot = new SlackBot({
            "token": token,
            "name": getUserData.real_name
        });
        console.log(getUserData);
        messageBot.on('start', function () {
            messageBot.postMessageToGroup("officer-meme", message, {
                "icon_url": getUserData.profile.image_48
            });
        });
    }, defaultErrorHandler);

});

function defaultErrorHandler(err) {
    console.error('\x1b[41m Error:', err, '\x1b[0m');
}