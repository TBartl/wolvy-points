var facts = [
    "Hey kids, it's time for another fun Wolvy Fact! Did you know that there are more WolverineSoft officers than there are actual Wolverines in Michigan? That's right! While Michigan is frequently referred to as the Wolvine State, the number of actual Wolverines in the state is actually quite low! Two Wolverines are enclosed in the Detroit Public Zoo, but no Wolverines have been seen in the wild since 2004 (which was the first one spotted in 200 years)! It was found dead 6 years later :rip:.",
    "Hey kids, it's time for another fun Wolvy Fact! Unlike WolverineSoft members, real wolverines can get a ton of exercise. Individual wolverines may travel up to 15 miles in a single day to find enough food for their carnivorous diet.",
    "Hey kids, it's time for another fun Wolvy Fact! Did you know that Wolverines aren't picky eaters? While most of their diet consists of small rodents, Wolverines will also attack animals many times their size like caribou if they are injured. Wolverines also feed on carrion, and they'll even eat a bit of vegetarian fare in the summer season. Quite the opportunists!",
    "Hey kids, it's time for another fun Wolvy Fact! Did you know that Wolverines are nocturnal just like some of our officers (see: @hkawoosa)? Because of this, Wolverines rely on their acute sense of smell and hearing instead of their poor vision to find food.",
    "Hey kids, it's time for another fun Wolvy Fact! Did you know that while wolverines look like a small bear, they are actually a member of the weasel family? That makes them the largest species of weasel in the world!",
    "Hey kids, it's time for another fun Wolvy Fact! Did you know that wolverines don't hibernate for the winter? That's right, while wolverines have a particularly heavy set of fur that would allow them to survive the winter while staying active!",
    "Hey kids, it's time for another fun Wolvy Fact! Did you know that the wolverine hasn't always had the same name? The first recorded name for the animal was when the word \"wolvering\" was used to describe the pelt onboard a ship from Scandinavia to London in the 16th century. The word was misinterpreted and that's how we have the word \"wolverine\" today!",
    "Hey kids, it's time for another fun Wolvy Fact! Did you know that wolverines can swim and climb trees? But just because they can doesn't mean they do",
    "Hey kids, it's time for another fun Wolvy Fact! Did you know that wolverines are polygamous? This means that a male will mate with several females. They mate from May to August.",
    "Hey kids, it's time for another fun Wolvy Fact! Did you know that sometimes, wolverine kits will stay with their mother until they are ready to have kits of their own. Wolverines are ready to reproduce at around 2 years old. Usually, though, kits head out on their own by September.",
    "Hey kids, it's time for another fun Wolvy Fact! Did you know that when a wolverine takes a step, its paw spreads to almost twice its original size as it presses against the ground? This makes it easier for wolverines to walk on snow. It's like built-in snowshoes.",
    "Hey kits, it's time for another fun Wolvy Fact! Did you know that baby wolverines are called kits? Kits are born with their eyes closed and are covered in white fur. While the females handle the bulk of the rearing, males will visit from time to time and care for the young.",
    "Hey kids, it's time for another fun Wolvy Fact! Did you know that wolverines are solitary creatures, and need great swaths of territory to roam? Males mark their territory with their scent and only share their turf with females. Their territories can range from 40 miles (65 km) to more than 372 miles (600 km).",
    "Hey kids, it's time for another fun Wolvy Fact! Did you know that wolverines prefer colder areas because they use the snow for dens and food storage? They live in the Arctic and subarctic, in grasslands, Alpine forests, taiga, boreal forests and tundra of Europe, Asia, and in North America in the northern latitudes.",
    "Hey kids, it's time for another fun Wolvy Fact! Did you know that a wolverine has gotten tips from a rock? While preparing for his role in superhero movie \The Wolverine\", Hugh Jackman asked Dwayne \"The Rock\" Johnson for bodybuilding advice.",
    "Hey kids, it's time for another fun Wolvy Fact! Did you know that the movie \"The Wolverine\" isn't actually about real wolverines? The film is actually about a superhero named \"Wolverine\" who has metal claws. The film currently has a 69% on rotten tomatoes, so you could say it too is bad.",
    "Hey kids, it's time for another fun Wolvy Fact! Did you know wolverines can climb trees? While wolverines sleep, hunt and give birth on the ground, the can also climb trees just like some bears. They can do this because of their long, sharp hook-like claws, which they also use to climb sheer cliffs, icefalls and snowy peaks."
]


module.exports.run = function (data) {
    var randomIndex = Math.floor(Math.random() * facts.length);
    var message = facts[randomIndex] + "\n";

    var userName = data.userName;
    var user = data.saveData.users[userName];
    if (user && isReadyForFactBonus(data.saveData)) {
        user.points += 1;
        message += userName + " has recieved 1 WP for requesting the first fact of the day!"
    }

    data.postMessage(message);
}

function isReadyForFactBonus(saveData) {
    var currentDate = new Date();
    var currentDay = currentDate.getDay();
    if (saveData.nextFactBonus == undefined || saveData.nextFactBonus != currentDay) {
        saveData.nextFactBonus = currentDay;
        return true;
    }
    return false;
}

module.exports.help = `"wp help".
Displays 1 of ` + facts.length + ` fun facts about wolverines. If this is the first fact requested of the day, you will also recieve an additional 1 WP!`;

module.exports.restriction = "None";