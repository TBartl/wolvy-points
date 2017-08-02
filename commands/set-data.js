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

    var startIndex = data.words[0].length + 1 + data.words[1].length + 1;
    var content = data.message.substr(startIndex);
    data.setSaveData(JSON.parse(content));
    data.postMessage("Data updated!");
}

module.exports.help = `"wp set-data"
Sets the contents of the file holding all data related to WP accounts. This command should be used with extreme caution.`;

module.exports.restriction = "Admin";