const fs = require("fs");

module.exports = async (req, res) => {
  // Base URL
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/"));
  // ID'yi al
  const id = req.url.split("/")[3];

  if (baseUrl === "/api/movies" && id) {
    try {
      // movies.json dosyasını okuyun
      const rawData = fs.readFileSync("./data/movies.json", "utf-8");
      const data = JSON.parse(rawData); // JSON olarak ayrıştırın

      // movies anahtarının varlığını kontrol edin ve diziye erişin
      const movies = data.movies;

      if (!Array.isArray(movies)) {
        throw new Error("movies.json dosyası geçerli bir JSON dizisi değil.");
      }

      const isFound = movies.filter((i) => i.id === id);

      if (!isFound.length) {
        res.writeHead(404);
        return res.end("Invalid Id");
      }

      const filtredMovies = movies.filter((item) => item.id != id);

      // Güncellenmiş diziyi movies.json'a yazın
      fs.writeFileSync(
        "./data/movies.json",
        JSON.stringify({ movies: filtredMovies })
      );

      // Client'a cevap
      res.writeHead(204, { "Content-Type": "application/json" });
      res.end();
    } catch (error) {
      console.error("Dosya işlemi sırasında bir hata oluştu:", error);
      res.writeHead(500);
      res.end("Sunucu hatası");
    }
  } else {
    res.writeHead(404);
    return res.end("Delete işlemi");
  }
};
