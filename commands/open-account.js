module.exports.run = function (data) {
    var targetUser = data.userName;

    if (data.words.length > 2) {
        if (data.saveData.users[data.userName] && data.saveData.users[data.userName].isAdmin) {
            targetUser = data.words[2];
        } else {
            data.postMessage("You aren't authorized to use the admin-version of this command!");
            return;
        }
    }

    if (!data.saveData.users[targetUser]) {
        data.saveData.users[targetUser] = {
            "points": 3,
            "spent": 0
        };
        data.postMessage("User " + targetUser + " was created with 3 WP (to help get you started).");
    } else {
        data.postMessage("User already has a WP account!");
    }

}

module.exports.help = `"wp open-account".
Opens a WP account for yourself. Can only be used if you don't already have an account.`;

module.exports.restriction = "None";