module.exports.run = function (data) {
    var user = data.saveData.users[data.userName];
    if (!user) {
        data.postMessage("You can't use this command!");
        return;
    }

    if (data.words.length <= 3) {
        data.postMessage("Not enough arguments provided!");
        return;
    }

    var targetUserName = data.words[2];
    var targetUser = data.saveData.users[targetUserName];
    if (!targetUser) {
        data.postMessage(targetUserName + " is not a valid user!");
        return;
    }

    var amount = parseInt(data.words[3]);
    if (isNaN(amount))
        amount = 0;
    if (amount < 0) {
        user.points -= 1;
        data.postMessage("What are you trying to pull there? Docking you 1 WP for trying to be all smart.");
        return;
    }
    if (user.points - amount < 0) {
        data.postMessage("You can't put yourself in debt!");
        return;
    }

    user.points -= amount;
    targetUser.points += amount;


    data.postMessage(amount + " WP transferred from " + data.userName + " (balance: " + user.points + " WP) to " + targetUserName + " (balance: " + targetUser.points + " WP) .");
}

module.exports.help = `wp "give <targetUser> <amount>".
Gives <targetUser> <amount> of your WP.`;

module.exports.restriction = "User";