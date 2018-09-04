export default function sleeper() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("first");
    }, 6000);
  });
}
