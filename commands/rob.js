module.exports.run = function (data) {
    var user = data.saveData.users[data.userName];
    if (!user || !user.isRobber) {
        data.postMessage("You can't use this command!");
        return;
    }

    if (data.words.length <= 2) {
        data.postMessage("Not enough arguments provided!");
        return;
    }

    var targetUserName = data.words[2];
    if (targetUserName == data.userName) {
        data.postMessage("You can't rob yourself!");
        return;
    }

    var targetUser = data.saveData.users[targetUserName];
    if (!targetUser) {
        data.postMessage(targetUserName + " is not a valid user!");
        return;
    }

    if (!isReadyToRob(user)) {
        data.postMessage("You can not rob again yet!");
        return;
    }

    var amount = 1 * user.isRobber;
    user.points += amount;
    targetUser.points -= amount;

    var message = data.userName + " robbed " + amount + " WP from " + targetUserName + "!\nNew balance for " + data.userName + " is " + user.points + " WP.\nNew balance for " + targetUserName + " is " + targetUser.points + " WP.";

    if (data.userName == "hkawoosa" && targetUserName == "tbartl") {
        data.postMessage("Pfft, you think I'm going to reward this behaviour by changing this message everyday?");
        setTimeout(function () {
            message = ":angrthomas::angrthomas::angrthomas::angrthomas::angrthomas::angrthomas::angrthomas::angrthomas::angrthomas::angrthomas::angrthomas::angrthomas:\n" + message;
            data.postMessage(message);
        }, 3000);
    } else {
        data.postMessage(message);
    }

}

function isReadyToRob(user) {
    var currentDate = new Date();
    var currentDay = currentDate.getDay();
    if (user.nextRob == undefined || user.nextRob != currentDay) {
        user.nextRob = currentDay;
        return true;
    }
    return false;
}


module.exports.help = `"wp rob <targetUser>".
Steals 1 WP from the user.`;

module.exports.restriction = "Robber";