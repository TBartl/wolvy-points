module.exports.run = function (data) {
    var message = `This command is still a work in progress! In the future it will include users created, total WP printed, and total WP spent.".`
    data.postMessage(message);
}

module.exports.help = `"wp statistics"
Displays statistics about WP.`;

module.exports.restriction = "None";