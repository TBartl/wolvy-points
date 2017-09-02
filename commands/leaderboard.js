module.exports.run = function (data) {
    var sorted = [];
    var longestName = 0;

    Object.keys(data.saveData.users).forEach(function (key) {
        if (key.length > longestName)
            longestName = key.length;
        sorted.push({
            "name": key,
            "points": data.saveData.users[key].points,
            "spent": data.saveData.users[key].spent
        });
    });
    sorted.sort(function (a, b) {
        return (b.points + b.spent) - (a.points + a.spent);
    });

    var longestRank = (sorted.length + 1).toString().length;
    var digits = 5;

    var message = "Current WP Standings:";
    message += '\n```';
    message += ' '.repeat(2 + longestRank) + "Name " + ' '.repeat(longestName - 4) + "| Life  |Current| Spent |";

    for (var i = 0; i < sorted.length; i++) {
        message += "\n" + (i + 1) + ") ";
        message += " ".repeat(longestRank - (i+1).toString().length);

        message += sorted[i].name + " ";
        message += ' '.repeat(longestName - sorted[i].name.length);
        message += "|";

        var nums = [sorted[i].points + sorted[i].spent, sorted[i].points, sorted[i].spent];
        nums.forEach(function (num) {
            var numStr = num.toString();
            message += " ".repeat(digits - numStr.length);
            message += numStr;
            message += "WP|";
        }, this);
    }
    message += '```';

    data.postMessage(message);
}

module.exports.help = `"wp leaderboard". 
Displays a leaderboard of users based on Lifetime WP.
Lifetime WP = Current WP + Spent WP.`;

module.exports.restriction = "None";