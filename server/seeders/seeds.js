// // const faker = require('faker');
// const { User, Friend } = require('../models');
// const userSeeds = require('./userSeed.json');
// const friendSeeds = require('./friendSeed.json');
// const db = require('../config/connection');

// db.once('open', async () => {
//   try {
//     if(friendSeeds) {
//       await Friend.deleteMany({});
//     }
//     if (userSeeds) {
//       await User.deleteMany({});
//     }
    
//     await User.create(userSeeds);

//     for (let i = 0; i < friendSeeds.length; i++) {
//       const { _id, name } = await Friend.create(friendSeeds[i]);
//       const friendList = await User.findOneAndUpdate(
//         { name: name },
//         {
//           $addToSet: {
//             friends: _id,
//           },
//         }
//         );
//       return friendList;
//     }
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
  
//   console.log('all done!');
//   process.exit(0);
// });

// module.exports = { friendSeeds, userSeeds } 