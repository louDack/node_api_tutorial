const http = require('http');
const { getProducts } = require('./controllers/productController');

const server = http.createServer((req, res) => {
  if (req.url === '/api/products' && req.method === 'GET') {
    getProducts(req, res);
  } else {
    res.writeHead(404, 'text/plain');
    res.end('<h1>404 PAGE NOT FOUND</h1>');
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
