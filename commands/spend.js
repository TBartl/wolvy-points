var mysteryBoxes = [{
    "name": "Friendly Mystery Box",
    "desc": [
        "*Friendship*: All users gain +5 WP, courtesy of you!",
        "*Gifter*: Once per day, you can now gift a user +2 WP by typing \"wolvy-points gift <name>\""
    ]
}]

module.exports.run = function (data) {
    var userName = data.userName;
    var user = data.saveData.users[userName];
    if (!user || !user.isAdmin) {
        data.postMessage("You can't use this command!");
        return;
    }

    if (data.words.length <= 2) {
        data.postMessage("Not enough arguments provided!");
        return;
    }

    var amount = parseInt(data.words[2]);
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
    user.spent += amount;

    var message = userName + " spent " + amount + " WP. New balance: " + user.points + " WP. Total spent by user: " + user.spent + " WP.\n";

    if (amount == 10) {
        user.isPremium = true;
        message += userName + " has unlocked wolvy-point premium status. Your wolvy point commands will now have a special icon.";
    } else if (amount == 20) {
        message += userName + " has spent enough to unlock a new emoji! Talk to a WP admin to recieve your emoji.";
    } else if (amount == 30) {
        message += userName + " has spent enough to unlock a new, weeb emoji! Talk to a WP admin to recieve your weeb emoji.";
    } else if (amount == 40) {
        // message += "Mystery Boxes are currently unavailable. We apologize for this inconvenience!";

        var boxIndex = Math.floor(Math.random() * mysteryBoxes.length);
        var box = mysteryBoxes[boxIndex];
        message += postMysteryBox(box, data);

    } else if (amount == 100) {
        message += userName + " has disabled automatic Wolvy Facts :rip:\nBy disabling automatic Wolvy Facts you have enabled manual Wolvy Facts. Users can now type \"wolvy-points fact\" to get a random Wolvy Fact. To incentivize this, the first person to request a Wolvy Fact each day will recieve a bonus 1 WP.";
    }

    data.postMessage(message);
}

function postMysteryBox(box, data) {
    var message = "";
    message += data.userName + " has purchased a mystery box!\n";
    message += "The mystery box is: *" + box.name + ". Let's see what's inside!\n";
    for (var i = 0; i < box.desc.length; i++) {
        message += (i + 1).toString() + ") " + box.desc[i] + "\n";
    }
    message += "...and remember kids, you too could earn some awesome prizes by purchasing a Mystery Box for only 40 WP!";
    return message;
}

module.exports.help = `wp "spend <amount>".
Spends <amount> of your WP. If you spend an ammount equal to a reward, you will recieve that reward.`;

module.exports.restriction = "User";