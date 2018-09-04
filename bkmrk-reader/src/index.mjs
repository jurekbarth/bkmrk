import express from "express";
import compression from "compression";
import fs from "fs";

import createHtml from "./createHtml";

// Init App
const app = express();
app.use(compression());

const dataDir = process.env.CRAWLER_DATA_DIR;

const exists = path => {
  return new Promise((resolve, reject) => {
    fs.exists(path, exists => {
      exists ? resolve(true) : resolve(false);
    });
  });
};

const read = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

app.get("/:uuid", async (req, res) => {
  const { uuid = "undefined" } = req.params;
  const path = `${dataDir}/${uuid}.html`;
  const ifExists = await exists(path);
  if (ifExists) {
    const contentBuffer = await read(path);
    const contents = contentBuffer.toString();
    res.send(createHtml(contents));
  } else {
    res.status(404);
    res.send("not found");
  }
});

app.listen(3005, () => console.log("Reader Microservice on Port: 3005!"));
