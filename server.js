const http = require('http');
const products = require('./data/products.json');

const server = http.createServer((req, res) => {
  // if we don't have req.method, any method can be used to get data.
  // Method being post/put/delete etc.
  if (req.url === '/api/products' && req.method === 'GET') {
    //   res.statusCode = 200;
    //   res.setHeader('Content-Type', 'text/html');
    // Better way of setting statusCode and header:
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // Faster way of writing response. Use res.end() to send response.
    // res.write(JSON.stringify(products));
    res.end(JSON.stringify(products));
  } else {
    // url doesn't match /api/products.
    res.writeHead(404, 'text/plain');
    res.end('<h1>404 PAGE NOT FOUND</h1>');
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
