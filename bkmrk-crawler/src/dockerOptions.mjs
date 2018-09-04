export default function getConfigs({ url, uuid }) {
  const dataDir = process.env.CRAWLER_DATA_HOST_DIR;
  const containerOpts = {
    Image: "jurekbarth/bkmrk-chrome",
    Tty: true,
    Volumes: {
      "/images": {}
    },
    HostConfig: {
      Binds: [`${dataDir}:/images`]
    },
    Env: [`TARGET_URL=${url}`, `UUID=${uuid}`]
  };
  return containerOpts;
}
