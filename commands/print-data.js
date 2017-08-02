module.exports.run = function (data) {
    var user = data.saveData.users[data.userName];
    if (!user || !user.isAdmin) {
        data.postMessage("You can't use this command!");
        return;
    }

    data.postMessage(JSON.stringify(data.saveData, null, 2));
}

module.exports.help = `"wp print-data"
Outputs the contents of the file holding all data related to WP accounts.`;

module.exports.restriction = "Admin";