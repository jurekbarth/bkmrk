import fs from "fs";
import fetch from "node-fetch";
import metascraper from "metascraper";

const dataDir = process.env.CRAWLER_DATA_DIR;

export default async function getMetaData(data) {
  const { url, uuid } = data;
  try {
    const res = await fetch(`https://mercury.postlight.com/parser?url=${url}`, {
      headers: {
        "x-api-key": process.env.CRAWLER_MERCURY_KEY
      }
    });
    if (res.status === 200) {
      const json = await res.json();
      const { content = null, title = "" } = json;
      const contents = `<div><h1 class="bkmrk-headline">${title}</h1><div class="bkmrk-content">${content}</div></div>`;
      fs.writeFileSync(`${dataDir}/${uuid}.html`, contents);
      return json;
    } else {
      // try with metascraper
      const res = await fetch(url);
      const html = await res.text();
      const resUrl = res.url;
      const metadata = await metascraper({ html, url });
      const {
        title = null,
        author = null,
        image = null,
        description = null
      } = metadata;
      const json = {
        title,
        author,
        // eslint-disable-next-line
        lead_image_url: image,
        excerpt: description
      };
      fs.writeFileSync(`${dataDir}/${uuid}.html`, "<h2>No contents found</h2>");
      return json;
    }
  } catch (error) {
    throw error;
  }
}
