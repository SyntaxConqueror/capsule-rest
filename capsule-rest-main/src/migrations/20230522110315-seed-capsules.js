const bcrypt = require('bcrypt');

module.exports = {
  async up(db, client) {
    let capsules = [];
    const facilities = ['Good mood', 'Great time with family'];
    for (let i = 1; i <= 100; i++) {
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
          price = 400;
          break;
      }
      capsules.push({
        name: `Capsule №${i}`,
        clientAmount: clientAmount,
        price: price,
        isReserved: false, 
        facillitiesList: facilities 
      });
    }

    
    await db.collection("capsules").insertMany(capsules);
  },

  async down(db, client) {
    await db.collection("capsules").deleteMany({});
  }
};