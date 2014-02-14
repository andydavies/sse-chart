var http = require('http');
var sys = require('sys');
var fs = require('fs');

var server = http.createServer(function(req, res) {
  debugHeaders(req);

  if (req.headers.accept && req.headers.accept == 'text/event-stream') {
    if (req.url == '/events') {
      sendSSE(req, res);
    } else {
      res.writeHead(404);
      res.end();
    }
  } else if (req.url == "/js/d3.v3.min.js" ||
             req.url == "/js/rickshaw.js") {
    res.writeHead(200, {'Content-Type': 'application/javascript'});
    res.write(fs.readFileSync(__dirname + req.url));
    res.end();
  }
  else if (req.url == "/css/graph.css" ||
           req.url == "/css/detail.css" ||
           req.url == "/css/legend.css" ||
           req.url == "/css/extensions.css") {
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.write(fs.readFileSync(__dirname + req.url));
    res.end();
  }
  else {    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(fs.readFileSync(__dirname + '/chart.html'));

    res.end();
  }
}).listen(8888);

console.log('Listening on %s', server.address().port);

function sendSSE(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  var id = Date.now();
  v = ~~Math.max(10, Math.min(45, 10 * (Math.random() - .5)));

  setInterval(function() {
    constructSSE(res, id++, v = ~~Math.max(10, Math.min(45, v + 10 * (Math.random() - .5))));
  }, 1000);

  constructSSE(res, id++, v);
  //res.end();
}

function constructSSE(res, id, data) {
  res.write('id: ' + id + '\n');
  res.write("data: {\"id\": " + id + ", \"value\": " + data + '}\n\n');
}

function debugHeaders(req) {
  sys.puts('URL: ' + req.url);
  for (var key in req.headers) {
    sys.puts(key + ': ' + req.headers[key]);
  }
  sys.puts('\n\n');
}