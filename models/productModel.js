const products = require('../data/products.json');

// Choice is yours if you want to use Promise or not. Figure out why to use one or the other. Pros and cons.
// Returns products array of json.
function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id);
    resolve(product);
  });
}

module.exports = {
  findAll,
  findById,
};
