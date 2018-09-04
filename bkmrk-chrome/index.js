const CDP = require("chrome-remote-interface");
const fs = require("fs");
const path = require("path");

function sleeper() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("first");
    }, 2000);
  });
}

async function getScreenshot(url, uuid) {
  const options = {
    host: "0.0.0.0"
  };
  const tab = await CDP.New();
  const client = await CDP({ tab });
  const { Page, Emulation } = client;
  const viewportWidth = 1280;
  const viewportHeight = 1280;
  const deviceMetrics = {
    width: viewportWidth,
    height: viewportHeight,
    deviceScaleFactor: 0,
    mobile: false,
    fitWindow: true
  };
  await Page.enable();
  await Emulation.setDeviceMetricsOverride(deviceMetrics);
  await Emulation.setVisibleSize({
    width: viewportWidth,
    height: viewportHeight
  });
  // await Emulation.forceViewport({ x: 0, y: 0, scale: 1 });
  console.log("###url###", url);
  await Page.navigate({ url });
  await Page.loadEventFired();
  await sleeper();
  const { data } = await Page.captureScreenshot();
  fs.writeFileSync(`/images/${uuid}.png`, Buffer.from(data, "base64"));
}

// Get URL and UUID from ENV Vars
const url = process.env.TARGET_URL;
const uuid = process.env.UUID;

getScreenshot(url, uuid);
