module.exports.run = function (data) {
    var message = "Exchange your WP for awesome rewards! Here are the rewards currently available:\n";
    message += " 10 WP: Wolvy-Points Premium Status. Doesn't change anything, but makes you feel better.\n";
    message += " 20 WP: Add your own custom emoji (note an additional 10 WP is required if the emoji features an anime character).\n";
    message += " 40 WP: Mystery Box! Who knows what's inside?\n";
    message += " 100 WP: Disable Wolvy-Facts\n";
    message += " 1000 WP: Give slack admins the power to kick people from channels again.\n";
    message += " 99999 WP: Get the official Wolvy Fursuit!\n";
    data.postMessage(message);
}

module.exports.help = `"wp rewards"
Displays information about rewards you can buy for WP using the "spend" command.`;

module.exports.restriction = "None";