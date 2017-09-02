module.exports.run = function (data) {
    var targetUserName = data.userName;

    if (data.words.length > 2) {
        targetUserName = data.words[2];
    }

    var targetUser = data.saveData.users[targetUserName];
    if (!targetUser) {
        data.postMessage(targetUserName + " is not a valid user!");
        return;
    }
    var message = targetUserName + " has " + targetUser.points + " WP and has spent " + targetUser.spent + " WP.";
    message += "\nPermissions: None, User";
    if (targetUser.isAdmin)
        message += ", Admin";
    if (targetUser.isGifter)
        message += ", Gifter" + ((targetUser.isGifter==1) ? "" : "(x" + targetUser.isGifter +")");
    if (targetUser.isRobber)
        message += ", Robber" + ((targetUser.isRobber==1) ? "" : "(x" + targetUser.isRobber +")");
    if (targetUser.isImpersonator)
        message += ", Impersonator";
    data.postMessage(message);
}

module.exports.help = `"wp account" or "wp account <targetUser>"
See information about a user's account.`;

module.exports.restriction = "None";