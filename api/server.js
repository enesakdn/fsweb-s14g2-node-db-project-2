const express = require("express");

const server = express();

const router = require("./cars/cars-router");

server.use(express.json());

server.use("/api/cars", router);
// SİHRİNİZİ GÖSTERİN

module.exports = server;
