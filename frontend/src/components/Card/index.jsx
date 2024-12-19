import { Link } from "react-router-dom";

const Card = ({ movie }) => {
  const rating = movie.rating;
  const color =
    rating > 9
      ? "blue"
      : rating > 7.5
      ? "green"
      : rating > 5
      ? "orange"
      : "red";

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="flex flex-col items-center w-[300px] p-3 transition-transform duration-300 ease-in-out transform bg-white border rounded-lg shadow-lg cursor-pointer hover:scale-105 hover:shadow-2xl hover:bg-gray-50"
    >
      <div className="relative overflow-hidden rounded-lg w-full h-[450px]">
        <img
          src={movie.image}
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out rounded-lg hover:scale-110"
          alt="poster"
        />
        <span
          style={{ backgroundColor: color }}
          className="absolute p-2 font-semibold text-white rounded-full shadow-lg right-2 top-2"
        >
          {movie.rating}
        </span>
      </div>
      <div className="mt-4 text-center">
        <h3 className="w-full text-xl font-bold text-gray-800 md:text-2xl line-clamp-2">
          {movie.title}
        </h3>

        <div className="flex flex-wrap justify-center gap-2 mt-2 text-gray-500">
          <p>{movie.year}</p>
          <div className="flex gap-2">
            {movie.genre.map((genre, index) => (
              <span
                key={index}
                className="px-2 py-1 text-sm text-gray-600 bg-gray-100 rounded whitespace-nowrap"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
