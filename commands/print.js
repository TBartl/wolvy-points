module.exports.run = function (data) {
    var user = data.saveData.users[data.userName];
    if (!user || !user.isAdmin) {
        data.postMessage("You can't use this command!");
        return;
    }

    if (data.words.length <= 2) {
        data.postMessage("Not enough arguments provided!");
        return;
    }

    var totalNewPrinted = 0;
    var message = "";
    for (var i = 2; i < data.words.length; i += 2) {
        if (data.words[i][0] == "\"")
            break;
        var targetUserName = data.words[i];
        if (!data.saveData.users[targetUserName])
            continue;
        var amount = parseInt(data.words[i + 1]);
        if (isNaN(amount)) {
            amount = 0;
        }
        totalNewPrinted += amount;
        data.saveData.users[targetUserName].points += amount;
        message += "\n" + targetUserName + " was given " + amount + " WP (balance: " + data.saveData.users[targetUserName].points + " WP).";
    }
    message = totalNewPrinted + " WP was just printed." + message;
    data.postMessage(message);
}

module.exports.help = `"wp print <user1> <amount1> <user2> <amount2> ... <userN> <amountN>". 
Prints WP for each user`;

module.exports.restriction = "Admin";