const requireDir = require('require-dir');
const plugins = require('./plugins');
const routes = requireDir('./routes');
const Hapi = require('hapi');
const path = require('path');
const fs = require('fs');

const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8000
});

server.register(plugins, (err) => {
  if (err) {
    throw err;
  }

  Object.keys(routes).forEach((name) => {
    routes[name](server);
  });

  server.start((err) => {
    server.connections.forEach((conn) => {
      console.log(`started at: ${conn.info.uri}`);
    });
  });
});
