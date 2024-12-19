module.exports = (requset) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      requset.on("data", (chunk) => {
        body += chunk;
      });
      requset.on("end", () => {
        resolve(JSON.parse(body));
      });
    } catch (err) {
      reject(err);
    }
  });
};
