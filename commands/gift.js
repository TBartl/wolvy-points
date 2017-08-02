module.exports.run = function (data) {
    var user = data.saveData.users[data.userName];
    if (!user || !user.isGifter) {
        data.postMessage("You can't use this command!");
        return;
    }

    if (data.words.length <= 2) {
        data.postMessage("Not enough arguments provided!");
        return;
    }

    var targetUserName = data.words[2];
    if (targetUserName == data.userName) {
        data.postMessage("You can't gift yourself!");
        return;
    }

    var targetUser = data.saveData.users[targetUserName];
    if (!targetUser) {
        data.postMessage(targetUserName + " is not a valid user!");
        return;
    }

    if (!isReadyToGift(user)) {
        data.postMessage("You can not gift again yet!");
        return;
    }

    var amount = 2;
    targetUser.points += amount;

    data.postMessage(targetUserName + " recieved " + amount + " WP, thanks to " + data.userName + "! New balance: " + targetUser.points + " WP.");
}

function isReadyToGift(user) {
    var currentDate = new Date();
    var currentDay = currentDate.getDay();
    if (user.nextGift == undefined || user.nextGift != currentDay) {
        user.nextGift = currentDay;
        return true;
    }
    return false;
}


module.exports.help = `"wp gift <targetUser>".
Prints and gifts the target 2 WP.`;

module.exports.restriction = "Gifter";