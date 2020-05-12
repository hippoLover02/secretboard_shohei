"use strict";
const http = require("http");
const auth = require("http-auth");
const router = require("./lib/router");

const basic = auth.basic({
  realm: "some area",
  file: "./users.htpasswd"
});

const server = http
  .createServer(basic, (req, res) => {
    router.route(req, res);
  })
  .on("error", e => {
    console.error("server error", e);
  })
  .on("clientError", e => {
    console.error("Client Error", e);
  });

const port = 8000;
server.listen(port, () => {
  console.info(`Listening on ${port}`);
});
