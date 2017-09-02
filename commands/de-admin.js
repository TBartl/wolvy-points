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


    data.saveData.users[targetUserName].isAdmin = false;
    data.postMessage(targetUserName + " has lost admin privileges.");
}

module.exports.help = `"wp de-admin <targetUser>". 
Makes <targetUser> not an admin.`;

module.exports.restriction = "Admin";