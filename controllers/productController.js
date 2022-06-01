const Products = require('../models/productModel');
const { getPostData } = require('../utils');

async function getProducts(req, res) {
  try {
    const products = await Products.findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

async function getProduct(req, res, id) {
  try {
    const product = await Products.findById(id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product not found!' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

async function createProduct(req, res) {
  try {
    const body = await getPostData(req);
    const { title, description, price } = JSON.parse(body);
    const product = {
      title,
      description,
      price,
    };
    const newProduct = await Products.create(product);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newProduct));
  } catch (err) {
    console.log(error);
  }
}

async function updateProduct(req, res, id) {
  try {
    const oldProduct = await Products.findById(id);
    const body = await getPostData(req);

    console.log(oldProduct);

    const {
      title = oldProduct.title,
      description = oldProduct.description,
      price = oldProduct.price,
    } = JSON.parse(body);

    const updated_product = {
      name: oldProduct.name,
      title,
      description,
      price,
      id: oldProduct.id,
    };

    // update products.json
    const newProduct = await Products.update(updated_product, id);

    console.log(newProduct);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newProduct));
  } catch (err) {
    console.log(err);
  }
}

async function deleteProduct(req, res, id) {
  try {
    await Products.deleteProd(id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Item deleted' }));
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
