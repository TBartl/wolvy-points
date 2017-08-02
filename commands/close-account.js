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

    var targetUserName = data.words[2];
    var targetUser = data.saveData.users[targetUserName];
    if (!targetUser) {
        data.postMessage(targetUserName + " is not a valid user!");
        return;
    }


    delete data.saveData.users[targetUserName];
    data.postMessage(targetUserName + "'s account was deleted.");
}

module.exports.help = `"wp close-account <targetUser>".
Closes the WP account of <targetUser>`;

module.exports.restriction = "Admin";
