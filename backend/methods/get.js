// fs i import et
const fs = require("fs");

module.exports = async (req, res) => {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/"));
  const id = req.url.split("/")[3];

  if (req.url == "/api/movies") {
    // Durum kodu belirle
    res.statusCode = 200;
    // Headerı ayarla
    res.setHeader("Content-Type", "application/json");
    // Verileri al
    const movies = fs.readFileSync("./data/movies.json", "utf-8");
    // Verileri client a gönder
    return res.end(movies);
  } else if (baseUrl == "/api/movies" && id) {
    // Bütün filmleri al
    const data = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));
    // Url'deki id değerine sahip filmi bul
    const movie = data.movies.find((movie) => movie.id === id);
    // Film bulunduysa bunu client'a gönder
    if (movie) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(movie));
    } else {
      return res.end("Geçersiz id");
    }
    // Film bulunmadıysa hata gönder
  } else {
    return res.end("İstek atılan url bulunamadı");
  }
};
