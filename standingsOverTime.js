var SlackBot = require('slackbots');
var path = require('path');
var fs = require('fs');

var days = []
var users = []

var text = fs.readFileSync("./standingsOverTime.txt", "utf-8");
var lines = text.split(/\r?\n/);

lines.forEach(function (line) {
    if (line === "Current WP Standings:")
        days.push({});
    if (line.length == 0)
        return;
    var firstLetter = line[0];
    if (firstLetter >= '0' && firstLetter <= '9') {
        var words = line.split(" ");
        var userName = words[1];
        if (users.indexOf(userName) == -1) {
            users.push(userName);
        }
    }
    var key = 'WP: ';
    var points = parseInt(line.substr(line.indexOf(key) + key.length));
    if (!points)
        return;
    days[days.length - 1][userName] = points;

}, this);

days = days.reverse();

var text = "";
users.forEach(function (user) {
    var line = user+",";
    days.forEach(function (day) {
        var points = day[user];
        if (!points)
            points = 0;
        line += points+",";
    }, this);
    text += line + '\n';
}, this);

fs.writeFileSync("./standingsOverTime.csv",text);