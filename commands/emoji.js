module.exports.run = function (data) {
    var message = `Emojis unlocked through WP can have certain user restrictions imposed on them by the person they were awarded to. By default they are free to use.
:moirai: Unlocked for 20 WP by tbartl on 7/20/2017. Currently free to the public.
:rainbow_wolvy: Unlocked in 40 WP mystery box by dbraunst on 7/26/2017. Currently free to the public.
:angrthomas: Unlocked for 20 WP by tbartl on 8/2/2017. Currently free to the public.`

    data.postMessage(message);
}

module.exports.help = `"wp emoji"
Displays information about WP's special emojis. Not all emojis in the slack were created through a WP purchase.`;

module.exports.restriction = "None";