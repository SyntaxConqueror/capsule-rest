const bcrypt = require('bcrypt');

module.exports = {
  async up(db, client) {
    let users = [];
    const hashedPassword = await bcrypt.hash('11111111', 10);
    for(let i = 1; i < 51; i++){
      users.push({name: `User ${i}`, email: `user${i}@gmail.com`, password: hashedPassword});
    }
     db.collection("users").insertMany(users);
  },

  async down(db, client) {
    await db.collection("publicfiles").drop();
    await db.collection("users").drop();
  }
};
