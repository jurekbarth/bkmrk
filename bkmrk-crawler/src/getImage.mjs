import cloudinary from "cloudinary";
import Docker from "dockerode";

import sleeper from "./sleeper";
import getContainerOpts from "./dockerOptions";

const dataDir = process.env.CRAWLER_DATA_DIR;
const docker = new Docker({ socketPath: "/var/run/docker.sock" });

async function setupChrome(data) {
  const containerOpts = getContainerOpts(data);
  try {
    const container = await docker.createContainer(containerOpts);
    const c = await container.start({});
    await sleeper();
    await c.stop();
    await c.remove();
    return { status: 200 };
  } catch (error) {
    try {
      await c.remove();
    } catch (err) {
      console.log(err);
    }
    console.log(error);
    return { status: 500, error };
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

export default async function getImage(data) {
  try {
    const { status } = await setupChrome(data);
    if (status === 200) {
      const a = new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
          `${dataDir}/${data.uuid}.png`,
          { public_id: data.uuid },
          function(error, result) {
            if (error) {
              reject(error);
            }
            resolve(result);
          }
        );
      });
      await a;
      return { status: 200 };
    } else {
      return { status: 400 };
    }

    return a;
  } catch (error) {
    console.log(error);
    return { status: 500, error };
  }
}
