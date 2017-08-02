module.exports.run = function (data) {
    var sorted = [];
    Object.keys(data.saveData.users).forEach(function (key) {
        sorted.push({
            "name": key,
            "points": data.saveData.users[key].points,
            "spent": data.saveData.users[key].spent
        });
    });
    sorted.sort(function (a, b) {
        return (b.points + b.spent) - (a.points + a.spent);
    });
    var message = "Current WP Standings:";
    for (var i = 0; i < sorted.length; i++) {
        message += "\n " + (i + 1) + ") " + sorted[i].name + " (Lifetime WP: " + (sorted[i].points + sorted[i].spent)
        if (sorted[i].spent > 0)
            message += ", Current WP: " + sorted[i].points;
        message += ")";
    }

    data.postMessage(message);
}

module.exports.help = `"wp leaderboard". 
Displays a leaderboard of users based on Lifetime WP.
Lifetime WP = Current WP + Spent WP.`;

module.exports.restriction = "None";