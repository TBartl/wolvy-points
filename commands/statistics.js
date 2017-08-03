module.exports.run = function (data) {
    var numUsers = 0;
    var totalActive = 0;
    var totalSpent = 0;
    Object.keys(data.saveData.users).forEach(function (key) {
        numUsers += 1;
        var user = data.saveData.users[key];
        totalActive += user.points;
        totalSpent += user.spent;
    }, this);

    var message = "";
    message += "There are " + numUsers + " users.\n";
    message += "There is a total of " + totalActive + " WP in circulation.\n";
    message += "There is a total of " + totalSpent + " WP that has been spent.\n";
    data.postMessage(message);
}

module.exports.help = `"wp statistics"
Displays statistics about WP.`;

module.exports.restriction = "None";