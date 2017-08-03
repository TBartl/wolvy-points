module.exports.run = function (data) {
    if (data.words.length <= 2) {
        var byRestriction = { "None": [], "User": [], "Admin": [] };
        var message = "The following commands are currently implemented. Note that some commands are restricted to certain users. Type \"wp help <command>\" for more information about that command.\n";
        Object.keys(data.commands).forEach(function (key) {
            var restriction = data.commands[key].restriction;
            if (!byRestriction[restriction])
                byRestriction[restriction] = [];
            byRestriction[restriction].push(key);

        }, this);

        Object.keys(byRestriction).forEach(function (key) {
            message += "Restrictions " + key + ": ";
            byRestriction[key].forEach(function (commandTag) {
                message += "*" + commandTag + "*, ";
            }, this);
            message = message.substr(0, message.length - 2) + '\n';
        }, this);
        data.postMessage(message);
    } else {
        var testKey = data.words[2];
        var foundKey = false;
        Object.keys(data.commands).forEach(function (key) {
            if (key.toLowerCase() == testKey.toLowerCase()) {
                data.postMessage("Help on the *" + key + "* command: " + data.commands[key].help + "\nRestrictions: " + data.commands[key].restriction);
                foundKey = true;
            }
        }, this);
        if (!foundKey)
            data.postMessage("No help available for " + testKey);
    }


}

module.exports.help = `"wp help" or "wp help <command>". 
Displays all options, or information about an command.`;

module.exports.restriction = "None";