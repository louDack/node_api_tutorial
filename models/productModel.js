const products = require('../data/products.json');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils');

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

function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = { ...product, id: uuidv4() };
    // The local server variable: products is updated BUT the hardcopy 'products.json' isn't.
    products.push(newProduct);

    // The path is relative to 'writeDataToFile() function def in utils.js'. Even though
    // writeDataToFile is being invoked in productModels.js.
    // https://stackoverflow.com/questions/9874382/whats-the-difference-between-process-cwd-vs-dirname/45145514#45145514
    //https://stackoverflow.com/questions/62216144/node-fs-writefile-with-absolute-path

    // He is overwriting the whole entire file with new javascript array b/c if you
    // insert js object, it goes outside of the brackets which becomes an error when
    // you try to read that array.
    writeDataToFile('./data/products.json', products);
    // console.log('new product: ', newProduct);
    resolve(newProduct);
  });
}

// What will make this mess easier to understand is to do pseudocode. Too many cases to keep track of and syntax to remember sometimes. That is a weakness of online coding tutorials. Lack of planning for beginners to see big picture. How to layout thought process without getting confused and lost.

function update(updated_product, id) {
  return new Promise((resolve, reject) => {
    try {
      // We need to update products.json.
      // Find the index we're going to insert updatedProduct to.
      const index = products.findIndex((p) => id === p.id);
      products[index] = updated_product;
      writeDataToFile('./data/products.json', products);
      resolve(updated_product)
    } catch (err) {
      resolve(err);
    }
  });
}

function deleteProd(id) {
  return new Promise((resolve, reject) => {
    const newProds = products.filter(p => p.id !== id)
    writeDataToFile('./data/products.json', newProds);
    resolve()
  })
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteProd
};
