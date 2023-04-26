const bcrypt = require('bcrypt');

module.exports = {
  async up(db, client) {
    let capsules = [];
    const facilities = ['Good mood', 'Great time with family'];
    for (let i = 1; i <= 30; i++) {
      const clientAmount = Math.floor(Math.random() * 3) + 1; 
      let price = 0;
      switch (clientAmount) {
        case 1:
          price = 400;
          break;
        case 2:
          price = 600;
          break;
        case 3:
          price = 750;
          break;
        default:
          price = 0;
          break;
      }
      capsules.push({
        name: `Capsule №${i}`,
        client_amount: clientAmount,
        price: price,
        is_reserved: Math.random() < 0.5, 
        facillities_list: facilities 
      });
    }

    
    await db.collection("capsules").insertMany(capsules);
  },

  async down(db, client) {
    await db.collection("capsules").deleteMany({});
  }
};



