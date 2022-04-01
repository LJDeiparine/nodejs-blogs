const http = require('http');
const fs = require('fs');
const _ = require('lodash');



const writeStream = fs.createWriteStream('./docs/history.txt', { encoding: 'utf8'}); // to write text to a file

const server = http.createServer((req, res) => {
  //lodash

  const num = _.random(0, 20);
  console.log(num);


  const greet = _.once(() => {
    console.log('Hello');
  });

  greet();
  // set header content type
  res.setHeader('Content-Type', 'text/html');

  // routing
  //status code 
  // 200 - everything is ok
  //404 - does not exist
  let path = './views/';

  switch(req.url) {
    case '/':
        path += 'index.html';
        res.statusCode = 200;
        writeStream.write('\n<p>Visited Index Page</p>');
      break;

    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      writeStream.write('\n<p>Visited About Page</p>');
      break;

    case '/about-me':
      res.statusCode = 301; // resource is permanently moved
      res.setHeader('Location', '/about'); // redirected to this directory
      writeStream.write('\n<p>Visited About-Me Page</p>');
      res.end();
      break;

    case '/history':
        path += '../docs/history.txt';
        res.statusCode = 200;
        writeStream.write('\n<p>Visited History Page</p>');
        break;

    default:
      path += '404.html';
      writeStream.write('\n<p>Visited 404 Not Found Page</p>');
      res.statusCode = 404;
  }

  // send html
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
     res.end(data);
   
  });


   





  

});

  


// localhost is the default value for 2nd argument
server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000');
});