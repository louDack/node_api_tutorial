const http = require('http');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('./controllers/productController');

const server = http.createServer((req, res) => {
  if (req.url === '/api/products' && req.method === 'GET') {
    getProducts(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === 'GET'
  ) {
    const id = req.url.split('/')[3];

    getProduct(req, res, id);
  } else if (req.url === '/api/products' && req.method === 'POST') {
    createProduct(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9a-z-]+)/) &&
    req.method === 'PUT'
  ) {
    const id = req.url.split('/')[3];
    updateProduct(req, res, id);
  } else if (
    req.url.match(/\/api\/products\/([0-9a-z-]+)/) &&
    req.method === 'DELETE'
  ) {
    const id = req.url.split('/')[3];
    deleteProduct(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 PAGE NOT FOUND</h1>');
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

// new functions:
// String function: match(): uses regex to find match.

// find(): array method to search for particular element.
