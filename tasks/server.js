'use strict';

//
//  S E R V E R
//
//  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let gulp        = require('gulp');
let argv        = require('yargs').argv;
let path        = require('./paths.js');

let server = {};
server.instance = require('browser-sync').create('server');

//  Start
//  ───────────────────────────────────
server.start = (done) => {
  if (!argv.no_server) {
    server.instance.init(
      argv.proxy
        ? { proxy: argv.proxy }
        : {
            server: { baseDir: path.to.root },
            port: argv.port ? argv.port : 5000
          }
    );
  }
  done();
}

server.start.displayName = "Starting server";

module.exports = server;