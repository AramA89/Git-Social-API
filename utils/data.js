const usernames =
[
    "kbryant",
    "mjordan",
    "soneil",
    "showtime",
    "wiltdastilt",
    "dbook",
    "lbjames",
    "mrclutch",
    "theglove",
    "kareem",
];

const emails = 
[
    "kb24@gmail.com",
    "mj23@gmail.com",
    "shaq@gmail.com",
    "magic@gmail.com",
    "wilt@gmail.com",
    "booker@gmail.com",
    "james6@gmail.com",
    "jerry@gmail.com",
    "peyton@gmail.com",
    "kareem@gmail.com",
];

const friends = 
[
    "shaqdiesel",
    "scottie",
    "bryant",
    "byron",
    "3peat",
    "dwade",
    "thelogo",
    "carter",
    "garnett",
    "thechamp",
];

const reactions = 
[
    "Wow!!!!!",
    "The King!",
    "5 Time Champ",
    "Amazing!",
    "Unreal!",
    "Fantastic!",
    "Very Fancy!",
    "Cerebral",
    "Magician",
    "The Goat",
];

const thoughts = 
[
    "Watch this",
    "This is my house!",
    "That was a great game",
    "We want the championship",
    "We need to rebuild",
    "I want a trade",
    "They played a great game",
    "I can watch them every night",
    "Greatest sport ever",
    "We are witnessing greatness",
];


const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUser = () =>
  `${getRandomArrItem(usernames)} ${getRandomArrItem(emails)}`;

const getRandomThoughts = () =>
  `${getRandomArrItem(thoughts)}`;

const getFriends = () =>
  `${getRandomArrItem(friends)}`;

const getRandomFriends = (int) => {
  const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        friends: getRandomArrItem(friends),
      });
    }
    return results;
  };

const getRandomThought = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        thoughtText: getRandomArrItem(thoughts),
      });
    }
    return results;
  };

  const getRandomReactions = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(reactions),
    });
  }
  return results;
};

module.exports = { getRandomUser, getFriends, getRandomFriends, getRandomThought, getRandomThoughts, getRandomReactions };
