import express from "express";
import bodyParser from "body-parser";
import basicAuth from "basic-auth-connect";
import fetch from "node-fetch";

import kue from "kue";

import getImage from "./getImage";
import getMetaData from "./getMetaData";

import { Link } from "./db";

// Init App
const app = express();

const host = process.env.REDIS_HOST || "redis";
const port = process.env.REDIS_PORT || 6379;

const queue = kue.createQueue({
  redis: {
    host,
    port
  }
});

const unless = function(path, middleware) {
  return function(req, res, next) {
    if (path === req.path) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
};

// Make Kue Backend accessible
const user = process.env.CRAWLER_BACKEND_USER;
const password = process.env.CRAWLER_BACKEND_PASSWORD;

app.use(unless("/crawlData", basicAuth(user, password)));

app.use(kue.app);

// Bodyparser middleware
app.use(bodyParser.json());

async function handleFailure(data, done) {
  try {
    const l = await Link.findById(data.uuid);
    if (l) {
      await l.update({
        title: "Website Offline / Not Found",
        crawl: false,
        image: "/notFound.png"
      });
    }
    done();
  } catch (error) {
    done(error);
  }
}

async function startProcessing(data, done) {
  // Check if website exists
  try {
    const { url } = data;
    const res = await fetch(url);
    if (res.status >= 400) {
      return handleFailure(data, done);
    }
  } catch (error) {
    return handleFailure(data, done);
  }
  // Normal procedure
  try {
    const p1 = await getImage(data);
    let image = "/noImage.png";
    if (p1.status === 500) {
      throw Error(p1);
    } else if (p1.status === 200) {
      image = null;
    }
    const p2 = await getMetaData(data);
    let {
      title = null,
      author = null,
      // eslint-disable-next-line
      lead_image_url = null,
      excerpt = null
    } = p2;
    const l = await Link.findById(data.uuid);
    // catch errors for too long contents
    if (title !== null && title.length > 250) {
      title = null;
    }
    if (author !== null && author.length > 250) {
      author = null;
    }
    if (lead_image_url !== null && lead_image_url.length > 250) {
      lead_image_url = null;
    }
    if (excerpt !== null && excerpt.length > 250) {
      excerpt = null;
    }
    if (l) {
      await l.update({
        title,
        author,
        leadimage: lead_image_url,
        excerpt,
        crawl: false,
        image
      });
    }
    done();
  } catch (error) {
    console.log(error);
    done(error);
  }
}

app.post("/crawlData", async (req, res) => {
  console.log("something happend");
  const headers = req.headers;
  const apiKey = process.env.CRAWLER_API_KEY;
  if (headers.hasOwnProperty("x-api-key") && headers["x-api-key"] === apiKey) {
    const data = req.body;
    const job = queue
      .create("crawl", data)
      .attempts(5)
      .backoff({ delay: 120 * 1000, type: "fixed" })
      .save(function(err) {
        if (err) {
          res.status(500);
          res.json({ status: "kue error" });
        } else {
          res.json({ status: job.id });
        }
      });
  } else {
    res.status(401);
    res.json({ status: "Unauthorized" });
  }
});

queue.process("crawl", function(job, done) {
  startProcessing(job.data, done);
});

app.listen(3001, () => console.log("Crawler Microservice on Port: 3001!"));
