const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');


module.exports = {
  async up(db, client) {
    let users = [];
    const hashedPassword = await bcrypt.hash('11111111', 10);
    for(let i = 1; i < 300000; i++){
      users.push({name: `${faker.internet.userName()}`, email: `user${i}@gmail.com`, password: hashedPassword});
    }
     await db.collection("users").insertMany(users);
  },

  async down(db, client) {
    await db.collection("users").drop();
  }
};
