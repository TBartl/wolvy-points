var oldBoxes = [{
    "name": "Friendly Mystery Box",
    "desc": [
        "*Friendship*: All users gain +5 WP, courtesy of you!",
        "*Gifter*: Once per day, you can now gift a user +2 WP by typing \"wolvy-points gift <name>\""
    ],
    "func": function (data) {
        var command = "wp print ";
        var amount = 5;
        Object.keys(data.saveData.users).forEach(function (userName) {
            command += userName + " " + amount + " ";
        }, this);
        data.runCommand('tbartl', data.groupName, command);
        data.saveData.users[data.userName].isGifter = data.saveData.users[data.userName].isGifter ? data.saveData.users[data.userName].isGifter + 1 : 1;
    }
}, {
    "name": "Political Mystery Box",
    "desc": [
        "*Admin*: Your account has been granted admin permissions, but don't abuse it or you'll lose it!",
        "*Inside Job*: Gain access to the secret test-channel, where you can get a sneak peek of new WP features! (requires admin)",
        "*Two Faced*: You've gained the ability to impersonate another user. Type 'wp help impersonate' for more information.",
        "*Man of the People/Corrupt Politician*: Choose to either gain one rob power or one gift power (requires admin to verify)."
    ],
    "func": function (data) {
        data.saveData.users[data.userName].isAdmin = true;
        data.saveData.users[data.userName].isImpersonator = true;
    }
}, {
    "name": "Enemy for Life Box",
    "desc": [
        "*Cash Now*: Gain 15 WP from another random user.",
        "*Payback*: The same random user gains one rob power."
    ],
    "func": function (data) {
        var allUsers = [];
        Object.keys(data.saveData.users).forEach(function (key) {
            allUsers.push(key);
        }, this);
        var randUserName = allUsers[Math.floor(allUsers.length * Math.random())];
        data.runCommand('tbartl', data.groupName, "wp print " + data.userName + " 15 " + randUserName + " -15");
        data.saveData.users[randUserName].isRobber = data.saveData.users[randUserName].isRobber ? data.saveData.users[randUserName].isRobber + 1 : 1;
        data.postMessage(data.userName + " is enemies with " + randUserName);
    }
}, {
    "name": "Lovers Mystery Box",
    "desc": [
        "*Gifter*: Gain one gift power.",
        "*Random Gifter*: Another random user has also gains one gift power.",
        "*The Spark*: You and your lover both gain 5 WP."
    ],
    "func": function (data) {

        var allUsers = [];
        Object.keys(data.saveData.users).forEach(function (key) {
            allUsers.push(key);
        }, this);
        data.saveData.users[data.userName].isGifter = data.saveData.users[data.userName].isGifter ? data.saveData.users[data.userName].isGifter + 1 : 1;
        data.saveData.users[data.userName].points += 5;
        var randUserName = allUsers[Math.floor(allUsers.length * Math.random())];
        data.saveData.users[randUserName].isGifter = data.saveData.users[randUserName].isGifter ? data.saveData.users[randUserName].isGifter + 1 : 1;
        data.saveData.users[randUserName].points += 5;
        data.postMessage(data.userName + " is lovers with " + randUserName + "! They both gained 5 WP.");
    }
}, {
    "name": "Identity Theft Mystery Box",
    "desc": [
        "*Impersonation*: Gain the ability to use the impersonate command.",
        "*Credit Card Theft*: Steal 15 WP from a random user."
    ],
    "func": function (data) {
        data.saveData.users[data.userName].isImpersonator = true;

        var allUsers = [];
        Object.keys(data.saveData.users).forEach(function (key) {
            allUsers.push(key);
        }, this);
        var randUserName = allUsers[Math.floor(allUsers.length * Math.random())];

        data.saveData.users[data.userName].points += 15;
        data.saveData.users[randUserName].points -= 15;
        data.postMessage(data.userName + " just stole 15 WP from " + randUserName);
    }
}, {
    "name": "The Grand Swap Box",
    "desc": [
        "*Swapped!*: Switch current WP with another user (this does not affect spent WP).",
        "*Impersonation*: Gain the ability to use the impersonate command."
    ],
    "func": function (data) {
        data.saveData.users[data.userName].isImpersonator = true;
        var allUsers = [];
        Object.keys(data.saveData.users).forEach(function (key) {
            allUsers.push(key);
        }, this);
        var randUserName = allUsers[Math.floor(allUsers.length * Math.random())];

        var originalPoints = data.saveData.users[data.userName].points;
        var randPoints = data.saveData.users[randUserName].points;

        data.saveData.users[data.userName].points = randPoints;
        data.saveData.users[randUserName].points = originalPoints;
        data.postMessage(data.userName + " swapped WP with " + randUserName);
    }
}]

var newBoxes = [{
    "name": "Self-Sacrifice Box",
    "desc": [
        "*Sacrifice*: Lose 9 WP, for...",
        "*Rob*: Gain one rob power.",
        "*Gift*: Gain one gift power.",
        "*Impersonator*: Gain the ability to impersonate.",
        "*Admin*: Gain admin rights. But don't abuse it or you'll lose it!"
    ],
    "func": function (data) {
        var user = data.saveData.users[data.userName];
        user.isRobber = user.isRobber ? user.isRobber + 1 : 1;
        user.isGifter = user.isGifter ? user.isGifter + 1 : 1;
        user.isImpersonator = true;
        user.isAdmin = true;
    }
}, {
    "name": "Enemy of the People Box",
    "desc": [
        "*Greed*: Gain 10 WP",
        "*Robber*: Gain one rob power.",
        "*All Your Fault*: All other users lose 3 WP."
    ],
    "func": function (data) {
        var user = data.saveData.users[data.userName];
        user.isRobber = user.isRobber ? user.isRobber + 1 : 1;

        var command = "wp print ";
        var plusAmount = 10;
        var minusAmount = -3;
        Object.keys(data.saveData.users).forEach(function (userName) {
            if (userName == data.userName) {
                command += userName + " " + plusAmount + " ";
            } else {
                command += userName + " " + minusAmount + " ";
            }
        }, this);
        data.runCommand('tbartl', data.groupName, command);
    }
}, {
    "name": "Robinhood Box",
    "desc": [
        "*From the Rich*: Gain one rob power",
        "*To the Poor*: Gain one gift power.",
        "*Equalizer*: All users move up to 4 closer to 20 WP."
    ],
    "func": function (data) {
        var user = data.saveData.users[data.userName];
        user.isRobber = user.isRobber ? user.isRobber + 1 : 1;
        user.isGifter = user.isGifter ? user.isGifter + 1 : 1;

        var command = "wp print ";
        var amount = 4;
        var center = 20;

        Object.keys(data.saveData.users).forEach(function (userName) {
            var thisUser = data.saveData.users[userName];
            var thisAmount = 0;
            if (thisUser.points < 20) {
                thisAmount = 4;
                var over = center - (thisUser.points + thisAmount);
                if (over > 0)
                    amount -= over;
            }
            if (thisUser.points > 20) {
                thisAmount = -4;
                var under = (thisUser.points + thisAmount) - center;
                if (under < 0)
                    amount -= under;
            }
            command += userName + " " + thisAmount + " ";
        }, this);
        data.runCommand('tbartl', data.groupName, command);
    }
}, {
    "name": "Landmine Box",
    "desc": [
        "*Owch*: Lose 9 WP.",
        "*AoE*: Everyone else loses 2 WP."
    ],
    "func": function (data) {
        var command = "wp print ";
        var bigAmount = -9;
        var smallAmount = -2;
        Object.keys(data.saveData.users).forEach(function (userName) {
            if (userName == data.userName) {
                command += userName + " " + bigAmount + " ";
            } else {
                command += userName + " " + smallAmount + " ";
            }
        }, this);
        data.runCommand('tbartl', data.groupName, command);
    }
}, {
    "name": "Absorb Box",
    "desc": [
        "*Host*: Another random user loses 1 rob power, 1 gift power, and the ability to impersonate (if they have it).",
        "*Self*: You gain whatever they lost."
    ],
    "func": function (data) {

        var allUsers = [];
        Object.keys(data.saveData.users).forEach(function (key) {
            allUsers.push(key);
        }, this);
        var randUserName = allUsers[Math.floor(allUsers.length * Math.random())];

        var user = data.users[data.userName];
        var randUser = data.users[randUserName];

        var lostRobPower = false;
        var lostGiftPower = false;
        var lostImpersonatePower = false;

        if (randUser.isRobber) {
            randUser.isRobber -= 1;
            user.isRobber = user.isRobber ? user.isRobber + 1 : 1;
            lostRobPower = true;
        }
        if (randUser.isGifter) {
            randUser.isGifter -= 1;
            user.isGifter = user.isGifter ? user.isGifter + 1 : 1;
            lostGiftPower = true;
        }
        if (randUser.isImpersonator) {
            randUser.isImpersonator = false;
            user.isImpersonator = true;
            lostImpersonatePower = true;
        }

        var message = randUserName + " is the host!\n";
        if (lostRobPower)
            message += " - transferred 1 rob power\n";
        if (lostGiftPower)
            message += " - transferred 1 gift power\n";
        if (lostImpersonatePower)
            message += " - transferred impersonate power\n";
        if (!lostRobPower && !lostGiftPower && !lostImpersonatePower)
            message += "... but they didn't have any abilities. Sucks to be " + data.userName + "!";

        data.postMessage(message);
    }
}, {
    "name": "Salvage Box",
    "desc": [
        "*Sacrifice*: Lose all rob power, gift power, and impersonate power.",
        "*Salvage*: Gain +15 WP for each power lost."
    ],
    "func": function (data) {

        var user = data.users[data.userName];

        var lostRobPower = false;
        var lostGiftPower = false;
        var lostImpersonatePower = false;

        var lost = 0;

        if (user.isRobber) {
            lost += user.isRobber;
            user.isRobber = 0;
            lostRobPower = true;
        }
        if (user.isGifter) {
            lost += user.isGifter;
            user.isGifter = 0;
            lostGiftPower = true;
        }
        if (user.isImpersonator) {
            lost += 1;
            user.isImpersonator = false;
            lostImpersonatePower = true;
        }

        var amount = 15;
        var total = lost * amount;
        user.points += total;

        var message = randUserName + " is salvaging!\n";
        if (lostRobPower)
            message += " - gave up their rob power\n";
        if (lostGiftPower)
            message += " - gave up their gift power\n";
        if (lostImpersonatePower)
            message += " - gave up their impersonate power\n";
        if (!lostRobPower && !lostGiftPower && !lostImpersonatePower)
            message += "... but didn't have any abilities. Sucks to be " + data.userName + "!\n";
        message += "He gained " + total + " WP";
        data.postMessage(message);
    }
}, {
    "name": "Swiss Bank Account Box",
    "desc": [
        "*The Ol' Switcharoo*: Your spent WP switches with your current WP."
    ],
    "func": function (data) {
        var user = data.users[data.userName];
        var oldPoints = user.points;
        var oldSpent = user.spent;
        user.points = oldSpent;
        user.spent = oldPoints;
    }
}, {
    "name": "Police Box",
    "desc": [
        "*Good Cop*: All other users lose a rob power, if they have it.",
        "*Bad Cop*: Gain +5WP for each rob power taken.",
    ],
    "func": function (data) {
        var robTaken = 0;
        Object.keys(data.saveData.users).forEach(function (key) {
            var thisUser = data.saveData.users[key];
            if (thisUser.isRobber) {
                thisUser.isRobber -= 1;
                robTaken += 1;
            }
        }, this);
        var points = robTaken * 5;
        data.saveData.users[data.userName].points += points;

        var message = data.userName + " removed " + robTaken + " rob power, gaining " + points + " WP.";
        data.postMessage(message);
    }
}];




module.exports.run = function (data) {
    var userName = data.userName;
    var user = data.saveData.users[userName];
    if (!user) {
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

        var boxList = oldBoxes;
        if (Math.random() > .1)
            boxList = newBoxes;

        var box = undefined;
        while (box == undefined) {
            var boxIndex = Math.floor(Math.random() * boxList.length);
            testBox = boxList[boxIndex];
            if (testBox.name != data.saveData.lastBoxName) {
                box = testBox;
                data.saveData.lastBoxName = testBox.name;
            }
        }

        message += postMysteryBox(box, data);
        setTimeout(function () {
            box.func(data);
        }, 2000);

    } else if (amount == 100) {
        message += userName + " has disabled automatic Wolvy Facts :rip:\nBy disabling automatic Wolvy Facts you have enabled manual Wolvy Facts. Users can now type \"wolvy-points fact\" to get a random Wolvy Fact. To incentivize this, the first person to request a Wolvy Fact each day will recieve a bonus 1 WP.";
    } else if (amount == 1000) {
        message += "Fuck off Hanna.";
    }

    data.postMessage(message);
}

function postMysteryBox(box, data) {
    var message = "";
    message += data.userName + " has purchased a mystery box!\n";
    message += "The mystery box is: *" + box.name + "*. Let's see what's inside!\n";
    for (var i = 0; i < box.desc.length; i++) {
        message += (i + 1).toString() + ") " + box.desc[i] + "\n";
    }
    message += "...and remember kids, you too could earn some awesome prizes by purchasing a Mystery Box for only 40 WP!";
    return message;
}

module.exports.help = `wp "spend <amount>".
Spends <amount> of your WP. If you spend an ammount equal to a reward, you will recieve that reward.
There are currently ` + oldBoxes.length + ` old boxes and ` + newBoxes.length + ` new boxes.`;

module.exports.restriction = "User";