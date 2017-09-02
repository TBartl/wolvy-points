module.exports.run = function (data) {

// *v1.00*: With the release of the first major version, wolvy is as robust and flexible as ever! While most of these changes aren't going to affect the major wolvy economy, there are a few things to keep in mind
// 1) *Command Tweaks:* Many of the commands now fall under slightly different names or have slightly different uses.
// 2) *Help Overhaul:* Help will now always stay up to date, and you can use help with any other command to see information about that command.
// 3) *Real Random Boxes:* Boxes are now chosen randomly from a pool of boxes. This pool is currently just 4 never before seen boxes, but will have more added in future versions.
// 4) *Automatic Boxes:* Boxes (usually) no longer require any admin-interaction, you get the contents on the spot!
// 5) *Robustness:* Whenever an error with input is encountered, wolvy will now always display an error message. To promote this, there is now a 3 WP bug bounty for any bugs you can find.

// *v1.01*: Minor bugfixes and some fun new boxes
// 1) *Impersonate*: This fun new command lets you impersonate another user through Wolvy Points (restricted to Impersonators). One original box now gives this as well.
// 2) *2 New Boxes*: Have been added to the mix. These boxes have some spicy rewards, like the ability to impersonate or the potential most WP gain you can get! 
// 3) *Bug Fixes*: Fixed lack of integer parsing for give command. Spend authorization problems fixed.
    var message = `
*v1.02*: Online announcement and new boxes
1) *Announcement*: Once per day, Wolvy Points will announce when he turns on.
2) *7 New Boxes*: Have been added to the mix. These feature fun new elements, like self-sacrifice for new abilities and stealing abilities from other users. 
`
    data.postMessage(message);
}

module.exports.help = `"wp changelog"
Outputs a list of recent changes made to the wolvy-points bot.`;

module.exports.restriction = "None";