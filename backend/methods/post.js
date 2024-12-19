const bodyParser = require("../utils/bodyParser");
const crypto = require("crypto");
const fs = require("fs");

module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      // İsteğin body kısmına eriş
      const body = await bodyParser(req);
      // İsteğin içeriğini kontrol et
      if (
        !body.title ||
        !body.year ||
        !body.rating ||
        !body.genre ||
        !body.genre.length > 0
      ) {
        res.writeHead(400);
        res.end("Lütfen ilgili alanları eksiksiz doldurunuz");
        return;
      }

      body.id = crypto.randomUUID();

      let data = fs.readFileSync("./data/movies.json", "utf-8");
      data = JSON.parse(data);

      data.movies.push(body);

      fs.writeFileSync("./data/movies.json", JSON.stringify(data));
      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(body));
    } catch (error) {
      console.error("Sunucu tarafında hata oluştu:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ message: "Sunucu hatası: veri kaydedilemedi." })
      );
    }
  } else {
    res.end("Geçersiz url'e istek attınız.");
  }
};
