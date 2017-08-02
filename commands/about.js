module.exports.run = function (data) {
    var message = `*wolvy-point bot v1.0*
Hey kids, my name is Wolvy Points and I'm this Slack's personal point system.
Wolvy :wolvy: was the original mascot for the club before the logo was changed to :wsoft: in 2016 as :wolvy: lacked... taste.
Eventually the idea came up to gamify the club using a point system to increase attendance, incentivize development, and encourage officers to do their job.
As this gamification concept was also pretty cringey, it soon became associated with :wolvy: and thus the concept of Wolvy Points was born.
Although it started as a joke, Wolvy Points is now a (mostly) functional system that you can use in this channel.
To get started open an account by typing "wolvy-points openAccount".
For more information, type "wolvy-points help".`
    data.postMessage(message);
}

module.exports.help = `"wp about"
Displays information about WP's creation and usage.`;

module.exports.restriction = "None";