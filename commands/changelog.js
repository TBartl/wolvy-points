module.exports.run = function (data) {
    var message = `*wolvy-point bot v1.0*
With the release of the first major version, wolvy is as robust and flexible as ever! While most of these changes aren't going to affect the major wolvy economy, there are a few things to keep in mind:
1) *Command Tweaks:* Many of the commands now fall under slightly different names or have slightly different uses.
2) *Help Overhaul:* Help will now always stay up to date, and you can use help with any other command to see information about that command.
3) *Real Random Boxes:* Boxes are now chosen randomly from a pool of boxes. This pool is currently just 4 never before seen boxes, but will have more added in future versions.
4) *Automatic Boxes:* Boxes (usually) no longer require any admin-interaction, you get the contents on the spot!
5) *Robustness:* Whenever an error with input is encountered, wolvy will now always display an error message. To promote this, there is now a 3 WP bug bounty for any bugs you can find.
6) *Always-On:* Wolvy Points has been deployed on Heroku. Assuming all goes well, it should never be off.`
    data.postMessage(message);
}

module.exports.help = `"wp changelog"
Outputs a list of recent changes made to the wolvy-points bot.`;

module.exports.restriction = "None";