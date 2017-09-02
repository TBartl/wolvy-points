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
        var originalPoints = data.saveData.users[targetUserName].points;
        data.saveData.users[targetUserName].points += amount;
        var newPoints = data.saveData.users[targetUserName].points;
        message += "\n" + targetUserName + " was given " + amount + " WP (balance: " + data.saveData.users[targetUserName].points + " WP).";

        if (originalPoints > -10 && newPoints <= -10) {
            message += "\n" + targetUserName + " just fell below a debt threshold (-10). They will lose their emotes.";
        }
        if (originalPoints > -15 && newPoints <= -15) {
            message += "\n" + targetUserName + " just fell below a debt threshold (-15). They've unlocked a special punishment box!.";
            message += "\n" + targetUserName + " has opened the *Mime* mystery box. Let's see what's inside!";
            message += "\n*Silent Act*: You can no longer type messages in officer-meme until you get above -15 WP. You can still post pictures and use emojis though!"
            message += "\n...and remember kids, you too could earn some awful prizes by getting a Punishment Mystery Box at -15 WP!.";
        }
        if (originalPoints > -20 && newPoints <= -20) {
            message += "\n" + targetUserName + " just fell below a debt threshold (-20). They will be removed from officer-meme.";
        }

    }
    message = totalNewPrinted + " WP was just printed." + message;
    data.postMessage(message);
}

module.exports.help = `"wp print <user1> <amount1> <user2> <amount2> ... <userN> <amountN>". 
Prints WP for each user`;

module.exports.restriction = "Admin";