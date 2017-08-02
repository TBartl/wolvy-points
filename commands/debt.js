module.exports.run = function (data) {
    var message = "Fall into debt? That's no fun. Well here's what will happen:\n";
    message += " -10 WP: Your emotes will be deleted.\n";
    message += " -15 WP: Mystery Box! (Punishment Edition).\n";
    message += " -20 WP: You will be removed from this channel.\n";
    message += " -99999 WP: You must wear the official Wolvy Fursuit at all advertising events.\n";
    data.postMessage(message);
}

module.exports.help = `"wp debt"
Displays information about what will happen to you at certain points upon falling in debt. These will be distributed by an admin.`;

module.exports.restriction = "None";