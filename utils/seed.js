const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomUser, getRandomFriends, getRandomReactions, getRandomThoughts, getRandomThought } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
    console.log("connected");
    await User.deleteMany({});
    await Thought.deleteMany({});
    const users = [];
    const thoughts = [];
for (let i = 0; i < 3; i++) {

    const friends = getRandomFriends(3);
const reactions = getRandomReactions(3);
const thought = getRandomThought(3);
const user = getRandomUser();
const username = user.split(' ')[0];
const email = user.split(' ')[1];
    users.push({
        username,
        email,
        friends,
        thought,
        reactions,
    });
const thoughtText = getRandomThoughts();
    thoughts.push({
        username,
        thoughtText,
        reactions,
    });
}

await User.collection.insertMany(users);

await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.info("Seeding complete");
    process.exit(0);
});